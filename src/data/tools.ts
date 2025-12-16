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
    externalUrl?: string;
}

// All tools - PDF Compressor is local (on this subdomain), others link to nanokito.com
export const tools: Tool[] = [
    {
        id: 'password-generator',
        slug: 'password-generator',
        title: { en: 'Password Generator', fr: 'Générateur de Mot de Passe' },
        description: { 
            en: 'Generate strong, secure passwords locally in your browser.', 
            fr: 'Générez des mots de passe forts et sécurisés localement.' 
        },
        icon: 'Lock',
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
        id: 'pdf-compressor',
        slug: 'pdf-compressor',
        title: { en: 'PDF Compressor', fr: 'Compresseur PDF' },
        description: { 
            en: 'Compress PDF files locally by rasterizing pages.', 
            fr: 'Compressez vos fichiers PDF localement en rastérisant les pages.' 
        },
        icon: 'File', 
        category: 'pdf',
        isNew: true,
    },
];

export const categoryLabels: Record<ToolCategory, Record<string, string>> = {
    developer: { en: 'Developer', fr: 'Développeur' },
    image: { en: 'Image', fr: 'Image' },
    text: { en: 'Text', fr: 'Texte' },
    pdf: { en: 'PDF', fr: 'PDF' }
};
