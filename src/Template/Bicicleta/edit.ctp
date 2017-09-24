<?php
/**
 * @var \App\View\AppView $this
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Opciones Bicicleta') ?></li>
        <li><?= $this->Form->postLink(
                __('Borrar'),
                ['action' => 'delete', $bicicletum->serial],
                ['confirm' => __('Estas seguro que quieres borrar esta bicicleta # {0}?', $bicicletum->serial)]
            )
        ?></li>
        <li><?= $this->Html->link(__('Lista Bicicletas'), ['action' => 'index']) ?></li>
    </ul>
</nav>
<div class="bicicleta form large-9 medium-8 columns content">
    <?= $this->Form->create($bicicletum) ?>
    <fieldset>
        <legend><?= __('Editar Bicicleta') ?></legend>
        <?php
            echo $this->Form->control('marca');
            echo $this->Form->control('descripcion');
            echo $this->Form->control('tamaño');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Editar')) ?>
    <?= $this->Form->end() ?>
</div>
