<?php

namespace App\Common\Abstract;

use App\Common\Exception\EntityNotSaveException;
use App\Common\Interface\EntityInterface;
use App\Common\Interface\RepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @template T
 *
 * @implements RepositoryInterface<T>
 */
abstract class Repository implements RepositoryInterface
{
    protected string|Model $model;

    /**
     * @param int $entityId
     *
     * @return T
     */
    public function getById(int $entityId)
    {
        $entity = $this->model::query()->where('id', $entityId)->first();

        return $entity;
    }

    /**
     * @param array<int> $entityIds
     *
     * @return Collection<int, T>
     */
    public function getByIds(array $entityIds): Collection
    {
        return $this->model::query()->whereIn('id', $entityIds)->get();
    }

    /**
     * @param bool $showOnTheTechnicalCommitteeOnly
     *
     * @return Collection<int, T>
     */
    public function getAll(bool $showOnTheTechnicalCommitteeOnly = false): Collection
    {
        $query = $this->model::query();

        return $query->get();
    }

    /**
     * @throws EntityNotSaveException
     */
    public function save(EntityInterface|Model $entity): Model|EntityInterface
    {
        $save = $entity->save();
        if (!$save) {
            throw new EntityNotSaveException();
        }

        return $entity;
    }

    public function delete(EntityInterface|Model $entity): bool
    {
        return $entity->delete();
    }

    public function deleteByIds(array $ids): bool
    {
        return $this->model::query()->whereIn('id', $ids)->delete();
    }

    public function deleteById(int $id): bool
    {
        return $this->model::query()->where('id', $id)->delete();
    }
}
