export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    type: string;
    status: 'Open' | 'Closed';
    imageSrc: string;
}
