import type { LucideIcon } from 'lucide-react';

export type ToolCategory = 'pdf' | 'developer' | 'image' | 'text';

export interface Tool {
    id: string;
    slug: string;
    title: Record<string, string>;
    description: Record<string, string>;
    icon: string; // Lucide icon name
    category: ToolCategory;
    isPopular?: boolean;
    isNew?: boolean;
}

export const tools: Tool[] = [
    {
        id: 'password-generator',
        slug: 'password-generator',
        title: { en: 'Password Generator', fr: 'Générateur de Mot de Passe' },
        description: { 
            en: 'Generate strong, secure passwords locally in your browser.', 
            fr: 'Générez des mots de passe forts et sécurisés localement.' 
        },
        icon: 'Lock', // Need to make sure Lock is imported/mapped
        category: 'developer',
        isPopular: true
    },
    {
        id: 'base64',
        slug: 'base64-converter',
        title: { en: 'Base64 Converter', fr: 'Convertisseur Base64' },
        description: { 
            en: 'Encode and decode data to Base64 format instantly.', 
            fr: 'Encodez et décodez des données au format Base64 instantanément.' 
        },
        icon: 'Code',
        category: 'developer',
        isPopular: true
    },
    {
        id: 'json-formatter',
        slug: 'json-formatter',
        title: { en: 'JSON Formatter', fr: 'Formateur JSON' },
        description: { 
            en: 'Minify or beautify JSON data with one click.', 
            fr: 'Minifiez ou embellissez vos données JSON en un clic.' 
        },
        icon: 'Braces',
        category: 'developer'
    },
    {
        id: 'uuid-generator',
        slug: 'uuid-generator',
        title: { en: 'UUID Generator', fr: 'Générateur UUID' },
        description: { 
            en: 'Generate random UUIDs (v4) for your applications.', 
            fr: 'Générez des UUID aléatoires (v4) pour vos applications.' 
        },
        icon: 'Fingerprint',
        category: 'developer',
        isNew: true
    },
    
    // Image Tools
    {
        id: 'image-compressor',
        slug: 'image-compressor',
        title: { en: 'Image Compressor', fr: 'Compresseur d\'Image' },
        description: { 
            en: 'Reduce image size without losing quality locally.', 
            fr: 'Réduisez la taille de vos images sans perte de qualité localement.' 
        },
        icon: 'Image',
        category: 'image',
        isPopular: true
    },
    {
        id: 'image-converter',
        slug: 'image-converter',
        title: { en: 'Image Converter', fr: 'Convertisseur d\'Image' },
        description: { 
            en: 'Convert images between PNG, JPG, WEBP and more.', 
            fr: 'Convertissez des images entre PNG, JPG, WEBP et plus.' 
        },
        icon: 'RefreshCw',
        category: 'image'
    },

    // Text Tools
    {
        id: 'word-counter',
        slug: 'word-counter',
        title: { en: 'Word Counter', fr: 'Compteur de Mots' },
        description: { 
            en: 'Count words, characters, and sentences in real-time.', 
            fr: 'Comptez les mots, caractères et phrases en temps réel.' 
        },
        icon: 'FileText',
        category: 'text',
        isPopular: true
    },
    {
        id: 'lorem-ipsum',
        slug: 'lorem-ipsum',
        title: { en: 'Lorem Ipsum Generator', fr: 'Générateur Lorem Ipsum' },
        description: { 
            en: 'Generate placeholder text for your designs.', 
            fr: 'Générez du faux texte pour vos designs.' 
        },
        icon: 'Type',
        category: 'text'
    },
     {
        id: 'case-converter',
        slug: 'case-converter',
        title: { en: 'Case Converter', fr: 'Convertisseur de Casse' },
        description: { 
            en: 'Convert text to uppercase, lowercase, title case, etc.', 
            fr: 'Convertissez le texte en majuscules, minuscules, titre, etc.' 
        },
        icon: 'Type',
        category: 'text'
    },

    // PDF Tools
    {
        id: 'pdf-merger',
        slug: 'pdf-merger',
        title: { en: 'PDF Merger', fr: 'Fusionner PDF' },
        description: { 
            en: 'Combine multiple PDF files into one document.', 
            fr: 'Combinez plusieurs fichiers PDF en un seul document.' 
        },
        icon: 'File', 
        category: 'pdf',
        isPopular: true
    },
    {
        id: 'pdf-to-img',
        slug: 'pdf-to-image',
        title: { en: 'PDF to Image', fr: 'PDF en Image' },
        description: { 
            en: 'Convert PDF pages to high-quality images.', 
            fr: 'Convertissez des pages PDF en images haute qualité.' 
        },
        icon: 'Image',
        category: 'pdf',
        isNew: true
    }
];

export const categoryLabels: Record<ToolCategory, Record<string, string>> = {
    developer: { en: 'Developer', fr: 'Développeur' },
    image: { en: 'Image', fr: 'Image' },
    text: { en: 'Text', fr: 'Texte' },
    pdf: { en: 'PDF', fr: 'PDF' }
};
