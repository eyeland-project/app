import { create } from 'zustand';

export interface ImageStackElement {
	imgUrl: string;
	idQuestion: number;
}

export interface ImageStack {
	imageStack: ImageStackElement[];
	pushImageStack: (elem: ImageStackElement) => void;
	clearImageStack: () => void;
}

const useImageStackStore = create<ImageStack>((set) => ({
	imageStack: [],
	pushImageStack: (elem: ImageStackElement) =>
		set((state) => ({ imageStack: [...state.imageStack, elem] })),
	// pushImageStack: (elem: ImageStackElement) =>
	// 	set((state) => {
	// 		console.log('imageStack', [...state.imageStack, elem]);
	// 		return { imageStack: [...state.imageStack, elem] };
	// 	}),
	clearImageStack: () => set({ imageStack: [] })
	// clearImageStack: () => {
	// 	console.log('imageStack []');
	// 	set({ imageStack: [] });
	// }
}));

export default useImageStackStore;
