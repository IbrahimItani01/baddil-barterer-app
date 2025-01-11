export interface CategoryItem {
    id: number;
    name: string;
    iconName: string;
    subcategories?: CategoryItem[]; 
}
