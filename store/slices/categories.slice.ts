import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Subcategory {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	main_category_id: string;
}

export interface Category {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	category_icon: string;
	subcategories: Subcategory[];
}

interface CategoriesState {
	categories: Category[];
}

const initialState: CategoriesState = {
	categories: [],
};

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
	},
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
