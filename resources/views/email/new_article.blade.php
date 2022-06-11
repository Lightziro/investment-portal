<?php
/** @var Article $article */

use App\Models\Article\Article;

$site_url = config('app.site_url');
$logo = "$site_url/images/logo/logo-base.png";
$site_name = config('app.site_name');

$link_article = "$site_url/article/{$article->getKey()}";

$content = strip_tags($article->content);

?>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:1px;line-height:normal">
    <tbody>
    <tr>
        <td align="center" bgcolor="#fafafa">
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                   style="max-width:700px;min-width:320px;width:100%">
                <tbody>
                <tr>
                    <td align="center" valign="top">
                        <div style="font-size:23px;height:25px;line-height:25px">&nbsp;</div>
                        <a href="{{$site_url}}"
                           target="_blank"
                           rel="noopener noreferrer">
                            <img alt="alt" src="{{$logo}}" width="110" style="display:inline-block">
                        </a>
                        <div style="font-size:23px;height:25px;line-height:25px">&nbsp;</div>
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="52b8ef86d0dd9716table700" border="0" cellpadding="0" cellspacing="0" width="100%"
                   style="max-width:700px;min-width:320px;width:100%">
                <tbody>
                <tr>
                    <td align="center" bgcolor="#FFFFFF">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%">
                            <tbody>
                            <tr>
                                <td align="left">
                                    <div style="font-size:13px;height:15px;line-height:15px">&nbsp;</div>
                                    <div
                                        style="border-top-color:#dbdbdb;border-top-style:solid;border-top-width:1px;font-size:1px;height:1px;line-height:1px">
                                        &nbsp;
                                    </div>
                                    <div style="font-size:13px;height:15px;line-height:15px">&nbsp;</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                   style="max-width:700px;min-width:320px;width:100%">
                <tbody>
                <tr>
                    <td align="center" bgcolor="#FFFFFF">
                        <table class="b245edcb6c564db4mob-w90" align="center" border="0" cellpadding="0" cellspacing="0"
                               width="85.8%">
                            <tbody>
                            <tr>
                                <td align="center">
                                    <div style="font-size:23px;height:25px;line-height:25px">&nbsp;</div>
                                    <div
                                        style="color:#000000;font-family:'roboto' , 'arial' , 'helvetica' , sans-serif;font-size:24px;font-weight:bold;line-height:30px">
                                        Новая статья на {{$site_name}}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                   style="max-width:700px;min-width:320px;width:100%">
                <tbody>
                <tr>
                    <td align="center" bgcolor="#FFFFFF">
                        <table border="0" cellpadding="0" cellspacing="0" width="60%">
                            <tbody>
                            <tr>
                                <td align="left" valign="top" style="line-height:24px">
                                    <div style="font-size:38px;height:40px;line-height:40px">&nbsp;</div>
                                    <div align="center">
                                        <a href="{{$link_article}}"
                                           target="_blank" style="color:#0a5991;text-decoration:none" data-link-id="220"
                                           rel="noopener noreferrer">
                                            <img alt="alt" border="0" src="/storage/{{$article->preview_path}}" style="display:block;width:100%"></a>
                                    </div>
                                    <div style="font-size:18px;height:20px;line-height:20px">&nbsp;</div>
                                    <span
                                        style="color:#0a5991;font-family:'arial' , 'helvetica' , sans-serif;font-size:22px;font-weight:bold;line-height:28px;text-decoration:none"><a
                                            href="{{$link_article}}"
                                            target="_blank" style="color:#0a5991;text-decoration:none"
                                            data-link-id="221" rel="noopener noreferrer">{{$article->title}} &nbsp;</a></span>
                                    <div style="font-size:3px;height:5px;line-height:5px">&nbsp;</div>
                                    <span
                                        style="color:#000000;font-family:'arial' , 'helvetica' , sans-serif;font-size:16px;line-height:24px">{{$content}}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div style="font-size:3px;height:5px;line-height:5px">&nbsp;</div>
                    </td>
                </tr>
                </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                   style="max-width:700px;min-width:320px;width:100%">
                <tbody>
                <tr>
                    <td align="center" bgcolor="#FFFFFF">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%">
                            <tbody>
                            <tr>
                                <td align="left" style="line-height:18px">
                                    <span
                                        style="color:#959595;font-family:'arial' , 'helvetica' , sans-serif;font-size:12px;line-height:18px">Вы получили это сообщение, поскольку являетесь пользователем услуг {{$site_name}} и выразили согласие на получение рассылки.</span>
                                    <div style="font-size:38px;height:40px;line-height:40px">&nbsp;</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>

        </td>
    </tr>
    </tbody>
</table>
