<?php
/** @var InvestmentIdea $idea */

use App\Models\Investment\InvestmentIdea;
$company = $idea->company;
$month = $idea->date_end->diffInMonths($idea->created_at);
$site_url = config('app.site_url');
?>

<table bgcolor="#F4F4F6" border="0" cellpadding="0" cellspacing="0" width="100%"
       style="border:medium;padding-left:15px;padding-right:15px">
    <tbody>
    <tr>
        <td style="vertical-align:top"></td>
        <td width="600" style="vertical-align:top">
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                   style="border:medium;margin:0 auto 0 auto;max-width:600px">
                <tbody>
                <tr>
                    <td style="padding-bottom:34px;padding-top:32px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:medium">
                            <tbody>
                            <tr>
                                <td>
                                    <a href="{{$site_url}}"
                                       data-link-id="1"
                                       target="_blank" rel="noopener noreferrer">
                                        <img height="30"
                                             src="{{$site_url}}/images/logo/logo-base.png" style="border:medium;height:32px;"></a>
                                </td>
                            </tr>
                            <tr>
                                <td style="color:#28282d;font-family:'arial' , sans-serif;font-size:32px;font-weight:bold;line-height:37px;padding-top:14px">
                                    <div >Инвестиционная идея по {{$company->name}} ({{$company->ticker}}) на {{$month}}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom:24px">
                        <table bgcolor="#28282D" border="0" cellpadding="0" cellspacing="0" width="100%"
                               style="border:medium;border-radius:10px 10px 0 0">
                            <tbody>
                            <tr>
                                <td style="padding:24px">
                                    <table class="f806a5a0b1aa000fdesktop" border="0" cellpadding="0" cellspacing="0"
                                           width="100%" style="border:medium">
                                        <tbody>
                                        <tr>
                                            <td align="left"
                                                style="padding-bottom:24px;padding-right:20px;padding-top:6px;vertical-align:top">
                                                <div
                                                    style="color:#dce0e5;font-family:'arial' , sans-serif;font-size:18px;font-weight:bold;line-height:29px">
                                                    Инвестиционная идея
                                                </div>
                                                <div
                                                    style="color:#dce0e5;font-family:'arial' , sans-serif;font-size:12px;font-weight:normal;line-height:18px">
                                                    Создана: {{$idea->created_at->format('d.m.Y')}}
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                           style="border:medium">
                                        <tbody>
                                        <tr>
                                            <td style="padding-bottom:32px;padding-top:20px;vertical-align:top">
                                                <div
                                                    style="color:#fff;font-family:'arial' , sans-serif;font-size:16px;font-weight:bold;line-height:18px">
                                                    <div >{{$company->name}} ({{$company->ticker}})</div>
                                                </div>
                                                <div
                                                    style="color:#bcc3cc;font-family:'arial' , sans-serif;font-size:12px;font-weight:normal;line-height:18px">
                                                    {{$company->ticker}}
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="f806a5a0b1aa000fdesktop" border="0" cellpadding="0" cellspacing="0"
                                           style="border:medium">
                                        <tbody>
                                        <tr>
                                            <td style="padding-bottom:24px;vertical-align:top;width:150px">
                                                <div
                                                    style="color:#bcc3cc;font-family:'arial' , sans-serif;font-size:12px;font-weight:normal;line-height:14px">
                                                    Начало
                                                </div>
                                                <div
                                                    style="color:#fff;font-family:'arial' , sans-serif;font-size:18px;font-weight:bold;line-height:26px">
                                                    ${{$idea->price_buy}}
                                                </div>
                                            </td>
                                            <td style="padding-bottom:24px;vertical-align:top;width:150px">
                                                <div
                                                    style="color:#bcc3cc;font-family:'arial' , sans-serif;font-size:12px;font-weight:normal;line-height:14px">
                                                    Цель
                                                </div>
                                                <div
                                                    style="color:#fff;font-family:'arial' , sans-serif;font-size:18px;font-weight:bold;line-height:26px">
                                                    ${{$idea->price_sell}}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom:24px;vertical-align:top;width:150px">
                                                <div
                                                    style="color:#bcc3cc;font-family:'arial' , sans-serif;font-size:12px;font-weight:normal;line-height:14px">
                                                    Срок
                                                </div>
                                                <div
                                                    style="color:#fff;font-family:'arial' , sans-serif;font-size:18px;font-weight:bold;line-height:26px">
                                                    {{$month}} месяцев
                                                </div>
                                            </td>
                                            <td style="padding-bottom:24px;vertical-align:top;width:150px">
                                                <div
                                                    style="color:#bcc3cc;font-family:'arial' , sans-serif;font-size:12px;font-weight:normal;line-height:14px">
                                                    Возможная<br>доходность
                                                </div>
                                                <div
                                                    style="color:#1fba66;font-family:'arial' , sans-serif;font-size:18px;font-weight:bold;line-height:26px">
                                                    +{{$idea->calculatePossibleProfit()}}%
                                                </div>
                                            </td>
                                            <td style="padding-bottom:24px;vertical-align:top;width:150px"></td>
                                            <td style="padding-bottom:24px;vertical-align:top;width:150px"></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table bgcolor="#1890ff" border="0" cellpadding="0" cellspacing="0" width="100%"
                               style="border:medium;border-radius:0 0 10px 10px">
                            <tbody>
                            <tr>
                                <td style="padding:19px 24px 19px 24px">
                                    <div style="color:#ffffff;font-family:'arial' , sans-serif;font-size:16px;font-weight:bold;line-height:18px">
                                        <a href="{{$site_url}}/investment-idea/{{$idea->idea_id}}"
                                           name="600e224e08f16d37link3" target="_blank"
                                           style="color:#ffffff;text-decoration:none" data-link-id="2"
                                           rel="noopener noreferrer"> <span style="color:#ffffff">Смотреть подробнее</span>
                                        </a></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom:24px;padding-top:8px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:medium">
                            <tbody>
                            <tr>
                                <td colspan="4" style="padding-bottom:24px;padding-left:24px;padding-right:24px">
                                    <div
                                        style="color:#28282d;font-family:'arial' , sans-serif;font-size:18px;font-weight:bold;line-height:21px">
                                        С уважением,<br>Команда «Investment-hub»
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="padding-left:24px;padding-right:24px">
                                    <div
                                        style="color:#7f858d;font-family:'arial' , sans-serif;font-size:12px;font-weight:normal;line-height:18px">
                                        Представленная информация не является индивидуальной инвестиционной
                                        рекомендацией, ни при каких условиях, в том числе при внешнем совпадении ее
                                        содержания с требованиями нормативно-правовых актов, предъявляемых к
                                        индивидуальной инвестиционной рекомендации. Любое сходство представленной
                                        информации с индивидуальной инвестиционной рекомендацией является случайным.
                                        Упомянутые в представленном сообщении финансовые инструменты ни при каких
                                        обстоятельствах не гарантируют доход, на который Вы возможно рассчитываете при условии
                                        использования предоставленной информации для принятия инвестиционных решений.
                                        Investment-hub не несет ответственности за возможные убытки инвестора в случае
                                        совершения операций, либо инвестирования в финансовые инструменты, упомянутые в
                                        представленной информации. Во всех случаях определение соответствия финансового
                                        инструмента либо операции инвестиционным целям, инвестиционному горизонту и
                                        толерантности к риску является задачей инвестора.
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
        <td style="vertical-align:top"></td>
    </tr>
    </tbody>
</table>
