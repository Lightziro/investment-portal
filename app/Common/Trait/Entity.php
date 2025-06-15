<?php

namespace App\Common\Trait;

/**
 * @property int id
 */
trait Entity
{
    public function getId(): int
    {
        return (int)$this->primaryKey ?? $this->id ?? 0;
    }
}
