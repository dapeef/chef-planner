export interface Recipe {
    id: string;
    title: string;
    description: string;
    cookingTime: number;
    servings: number;
    imageUrl?: string;
    // Add other fields as needed
}