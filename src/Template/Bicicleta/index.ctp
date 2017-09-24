<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Bicicletum[]|\Cake\Collection\CollectionInterface $bicicleta
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Opciones Bicicleta') ?></li>
        <li><?= $this->Html->link(__('Nueva Bicicleta'), ['action' => 'add']) ?></li>
    </ul>
</nav>
<div class="bicicleta index large-9 medium-8 columns content">
    <h3><?= __('Bicicleta') ?></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><?= $this->Paginator->sort('serial') ?></th>
                <th scope="col"><?= $this->Paginator->sort('marca') ?></th>
                <th scope="col"><?= $this->Paginator->sort('descripcion') ?></th>
                <th scope="col"><?= $this->Paginator->sort('tamaño') ?></th>
                <th scope="col"><?= $this->Paginator->sort('Cliente_cedula') ?></th>
                <th scope="col" class="actions"><?= __('Opciones') ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($bicicleta as $bicicletum): ?>
            <tr>
                <td><?= $this->Number->format($bicicletum->serial) ?></td>
                <td><?= h($bicicletum->marca) ?></td>
                <td><?= h($bicicletum->descripcion) ?></td>
                <td><?= h($bicicletum->tamaño) ?></td>
                <td><?= h($bicicletum->Cliente_cedula) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('Ver'), ['action' => 'view', $bicicletum->serial]) ?>
                    <?= $this->Html->link(__('Editar'), ['action' => 'edit', $bicicletum->serial]) ?>
                    <?= $this->Form->postLink(__('Borrar'), ['action' => 'delete', $bicicletum->serial], ['confirm' => __('Estas seguro que quieres borrar esta bicicleta # {0}?', $bicicletum->serial)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->first('<< ' . __('primero')) ?>
            <?= $this->Paginator->prev('< ' . __('anterior')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('siguiente') . ' >') ?>
            <?= $this->Paginator->last(__('ultimo') . ' >>') ?>
        </ul>
        <p><?= $this->Paginator->counter(['format' => __('Pagina {{page}} de {{pages}}, muestra {{current}} registro(s) tiene {{count}} total')]) ?></p>
    </div>
</div>
