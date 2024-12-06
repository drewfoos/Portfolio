// types/project.ts
export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    category?: string;
    figmaUrl?: string;
    liveUrl?: string;
    paperUrl?: string;
    codeUrl?: string;
}