import { TypeSearchEntity } from "../../enums/other.enums";

export interface Sex {
    value: string;
    label: string;
}

// TODO: Interface перенести
export interface SearchOption {
    entity: TypeSearchEntity;
    items: SearchItem[];
}

export interface SearchItem {
    entity_id: number;
    name: string;
    img_path: string;
}
