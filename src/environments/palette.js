import { signInAnonymously } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "./firebase";

const DEFAULT_COLORS = {
    primary: "#3B82F6",
    secondary: "#14B8A6",
    accent: "#F59E0B",
    background: "#F8FAFC",
    text: "#0F172A",
    success: "#22C55E",
};

function normalizeHexColor(value, fallback) {
    if (typeof value !== "string") {
        return fallback;
    }

    const trimmedValue = value.trim().toUpperCase();
    const normalizedValue = trimmedValue.startsWith("#")
        ? trimmedValue
        : `#${trimmedValue}`;

    return /^#[0-9A-F]{6}$/.test(normalizedValue) ? normalizedValue : fallback;
}

export function getDefaultPaletteColors() {
    return { ...DEFAULT_COLORS };
}

export async function ensureAuthenticatedUser() {
    if (auth.currentUser) {
        return auth.currentUser;
    }

    const credential = await signInAnonymously(auth);
    return credential.user;
}

export async function savePalette({ name, colors }) {
    const user = await ensureAuthenticatedUser();
    const paletteRef = ref(db, `users/${user.uid}/projects/designkit/palettes/current`);

    const normalizedColors = Object.entries(DEFAULT_COLORS).reduce(
        (accumulator, [slotName, fallbackColor]) => {
            accumulator[slotName] = normalizeHexColor(colors?.[slotName], fallbackColor);
            return accumulator;
        },
        {}
    );

    const palettePayload = {
        name: typeof name === "string" && name.trim() ? name.trim() : "Palette principale",
        createdAt: Date.now(),
        colors: normalizedColors,
    };

    await set(paletteRef, palettePayload);

    return palettePayload;
}
