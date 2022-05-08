<?php
/** @var UserRecovery $recovery */

use App\Models\User\UserRecovery;

$user = $recovery->user;
$site_url = config('app.site_url');
?>

<div>
    {{(string)$user}}, для восстановления доступа к аккаунту перейдите по <a target="_blank" href={{$site_url}}/recovery/{{$recovery->key}}">ссылке</a>
</div>
