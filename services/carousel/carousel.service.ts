import { CarouselProps } from 'antd';
import axios from 'axios'
import { CreateCarouselProps, UpdateCarouselProps } from './carousel.model';


export function getAllCarousel(): Promise<CarouselProps[]> {
    return axios.get('/carousels')
}
export function getCarouselById(id: string): Promise<CarouselProps> {
    return axios.get(`/carousels/${id}`)
}
// export function createCarousel(_createCarouselProps : CreateCarouselProps): Promise<any>{
//     return axios.post('/carousels/upload', {..._createCarouselProps})
// }
export function deleteCarousel(id: string): Promise<CarouselProps[]> {
    return axios.delete(`/carousels/${id}`)
}
// export function updateCarousel(id: string, _updateCarousel: UpdateCarouselProps): Promise<CarouselProps[]> {
//     return axios.put(`/carousels/${id}/update`, {..._updateCarousel})
// }

// export function testCarousel(fileTest: any){
//     // console.log(fileTest.getAll('image'))
//     return axios.post('/carousels/test', {...fileTest.getAll('image')})
// }