import { TypeSearchEntity } from "../../enums/other.enums";

export interface Sex {
    value: string;
    label: string;
}

// TODO: Interface перенести
export interface SearchOption {
    label: TypeSearchEntity;
    items: SearchItem[];
}

export interface SearchItem {
    entity_id: number;
    name: string;
}
