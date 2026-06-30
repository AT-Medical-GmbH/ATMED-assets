<?php
/**
 * Plugin Name: ATMED Global Footer
 * Description: Bindet den zentral gepflegten ATMED-Footer update-sicher ein (MU-Plugin).
 * Version: 1.0.0
 * Author: AT Medical GmbH
 *
 * Update-sicher: liegt als Must-Use-Plugin in wp-content/mu-plugins/ und wird
 * weder von Theme- noch von Core-Updates ueberschrieben. Es rendert den
 * vendorierten Footer (lokale Kopie aus ATMED-assets/shared/atmed-footer/dist)
 * im Theme-Footer-Hook. Kein Theme-Core-Hack.
 *
 * Pflege des Inhalts erfolgt zentral in ATMED-assets; nach `npm run release`
 * wird dist/ per deploy-footer in wp-content/atmed-footer/ synchronisiert.
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!defined('ATMED_FOOTER_DIR')) {
    // Vendorierte Kopie der zentralen Artefakte.
    define('ATMED_FOOTER_DIR', WP_CONTENT_DIR . '/atmed-footer');
}

/**
 * Footer-HTML (public-Variante) ausgeben.
 *
 * Wird via wp_footer so spaet wie moeglich gehaengt, damit kein Theme-Footer
 * doppelt erscheint. Bei fehlender Vendor-Kopie passiert nichts (Seite bleibt
 * intakt) - Fehler nur im Error-Log, nicht im Frontend.
 */
function atmed_footer_render(): void
{
    $html_file = ATMED_FOOTER_DIR . '/footer.html';
    $css_file  = ATMED_FOOTER_DIR . '/footer.css';

    if (!is_readable($html_file)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('[atmed-footer] vendor copy missing: ' . $html_file);
        }
        return;
    }

    // CSS inline einbinden, damit keine zusaetzliche HTTP-Abhaengigkeit entsteht.
    if (is_readable($css_file)) {
        echo "\n<style id=\"atmed-footer-css\">\n";
        echo file_get_contents($css_file); // statischer, vertrauenswuerdiger Build-Output
        echo "\n</style>\n";
    }

    // Footer-Markup ist vertrauenswuerdiger Build-Output (kein User-Input).
    echo file_get_contents($html_file);
}

// Prioritaet 99: nach dem Theme-Footer; Theme-eigenen Footer ggf. via Theme
// entfernen. Siehe README dieses Adapters.
add_action('wp_footer', 'atmed_footer_render', 99);

/**
 * Optional: Diagnose-Endpunkt fuer den Footer-Stand (nur fuer eingeloggte Admins).
 * Aufruf: /?atmed_footer_version=1
 */
add_action('init', function (): void {
    if (empty($_GET['atmed_footer_version']) || !current_user_can('manage_options')) {
        return;
    }
    $manifest = ATMED_FOOTER_DIR . '/footer.version.json';
    header('Content-Type: application/json; charset=utf-8');
    echo is_readable($manifest)
        ? file_get_contents($manifest)
        : json_encode(['error' => 'footer.version.json not found']);
    exit;
});
