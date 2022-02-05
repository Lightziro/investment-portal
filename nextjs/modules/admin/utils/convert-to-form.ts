import { IdeaPublishForm } from "../ts/types/forms/admin-idea-forms";
import { DtoPersonalIdea } from "../ts/types/response/admin-response-personal";
import moment from "moment";

export const convertFormPublishIdea = (
    dto: DtoPersonalIdea
): IdeaPublishForm => ({
    price_buy: dto.price_buy,
    price_sell: dto.price_sell,
    date_end: moment().add(3, "months").format("YYYY/MM/DD"),
    is_short: false,
    send_email: false,
});
