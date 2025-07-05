import { TypeSearchEntity } from "../../enums/other.enums";

export interface Sex {
    value: string;
    label: string;
}

export interface SearchOption {
    entity: TypeSearchEntity;
    items: SearchItem[];
}

export interface SearchItem {
    entity_id: number;
    name: string;
    img_path: string;
}
export interface EmotionItem {
    name: string;
    color: string;
}
export interface FilterOperations {
    event: string;
}
