import { useRef, useState } from "react"
import { testCarousel } from "../../services/carousel/carousel.service"
import axios from 'axios';

interface InternalValue {
    file: any
}

const TestAdd = () => {
    const [file, setFile] = useState()

    const value = useRef<InternalValue>({
        file: false
    })

    const handleChange = (fileChangeEvent: any) => {
        value.current.file = fileChangeEvent.target.files[0]
        // value.current.file.name = fileChangeEvent.target.files[0].name
    }
    // // const handleChange = (e: any) => {
    // //     const file = e.target.files[0]
    // //     setFile(file) 
    // }
    const onSubmitForm = (e: any) => {
        e.preventDefault()
        console.log(value.current.file)
        // const formData = new FormData();
        // formData.append('image', value.current.file, value.current.file.name)

        // axios.post("https://httpbin.org/anything", formData)
        // .then((res: any) => console.log(res))
        // .catch((err: any) => console.log(err))

        // const data = new FormData();
        // data.append('image', value.current.file, value.current.file.name);

        // const config = {
        // method: 'POST',
        // url: 'http://localhost:3000/carousels/test',
        // data: data,
        // };
        // return axios.post(config.url, config.data).then((res) => res.data);


        
    }

    return(
        <form action="" onSubmit={onSubmitForm}>
            <input onChange={handleChange} type="file" name="img" placeholder="Image Url" required/>
            <input type="submit"/>
        </form>
    )
}

export default TestAdd;