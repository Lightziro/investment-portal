<?php

namespace App\Common\Exception;

use Exception;

class EntityNotSaveException extends Exception
{
    protected $message = 'entity_not_save_exception';
    protected $code = 400;
}
