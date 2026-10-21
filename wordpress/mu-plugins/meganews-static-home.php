<?php
/**
 * Plugin Name: Mega News - Home estatica
 * Description: Serve o site Next.js exportado (index.html na raiz) na pagina inicial. As demais rotas do site novo sao pastas estaticas servidas direto pelo Apache. Apague este arquivo para voltar a home do WordPress.
 *
 * Instalar em wp-content/mu-plugins/. Necessario porque a imagem Docker do
 * WordPress usa "DirectoryIndex index.php index.html", entao o Apache sempre
 * entrega o index.php na raiz.
 */

add_action('template_redirect', function () {
    if (!is_front_page() || is_preview() || is_customize_preview() || isset($_GET['elementor-preview'])) {
        return;
    }

    $file = ABSPATH . 'index.html';
    if (!is_readable($file)) {
        return;
    }

    status_header(200);
    header('Content-Type: text/html; charset=UTF-8');
    readfile($file);
    exit;
}, 0);
