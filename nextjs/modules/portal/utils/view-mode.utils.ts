import { ViewMode } from "../ts/types/other.types";

export const viewModeColor = (viewMode: ViewMode, value) =>
    viewMode === value ? "primary" : "default";

export const isTile = (mode: ViewMode) => mode === "tile";

export const sizeByViewMode = (mode: ViewMode, simpleSize: number) =>
    isTile(mode) ? 12 : simpleSize;
