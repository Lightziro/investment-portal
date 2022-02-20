import SetOptions from "suneditor-react/dist/types/SetOptions";
import { TypeSearchEntity } from "../ts/enums/other.enums";

export const settingsSunEditor: SetOptions = {
    showPathLabel: false,
    buttonList: [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock"],
        ["paragraphStyle"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
        ["fontColor", "hiliteColor"],
        ["removeFormat"],
        "/", // Line break
        ["outdent", "indent"],
        ["align", "horizontalRule", "list", "lineHeight"],
        ["table", "link", "image"],
    ],
    formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    font: [
        "Arial",
        "Calibri",
        "Comic Sans",
        "Courier",
        "Garamond",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Palatino Linotype",
        "Segoe UI",
        "Tahoma",
        "Times New Roman",
        "Trebuchet MS",
    ],
};
export const getPhoto = (photo) => {
    if (!photo) {
        return null;
    }
    return typeof photo === "string"
        ? `${process.env.API_URL}/storage/${photo}`
        : URL.createObjectURL(photo);
};
// TODO: перенести
export const getSearchContent = (entity: TypeSearchEntity, item: any) => {
    switch (entity) {
        case TypeSearchEntity.profiles:
            return `${item.first_name} ${item.last_name}`;
        case TypeSearchEntity.companies:
            return item.name;
    }
};
export const getLinkByEntity = (label: TypeSearchEntity, entityId: number) => {
    switch (label) {
        case TypeSearchEntity.companies:
            return `/company/${entityId}`;
        case TypeSearchEntity.profiles:
            return `/profile/${entityId}`;
        default:
            return "";
    }
};
