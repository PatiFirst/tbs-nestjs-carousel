export interface CarouselProps {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    link: string;
    createdAt: string;
}
export interface CreateCarouselProps {
    title: string;
    description: string;
    // imgUrl: string;
    // file: any
    link: string;
}

export interface UpdateCarouselProps {
    id?: string;
    title?: string;
    description?: string;
    imgUrl?: string;
    link?: string;
    createdAt?: string;
}