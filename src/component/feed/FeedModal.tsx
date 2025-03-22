import useFetch from "../../hooks/useFetch.tsx";
import { useEffect } from "react";
import { PHOTO_GET } from "../../api.ts";
import styles from "./FeedModal.module.css";
import Error from "../Helpe/Error.tsx";
import Loading from "../Helpe/Loading.tsx";
import PhotoContent from "../photo/PhotoContent.tsx";

type FeedModalProps = {
    photo: { id: number } | null;
    setModalPhoto: React.Dispatch<React.SetStateAction<any>>;
};

const FeedModal = ({ photo, setModalPhoto }: FeedModalProps) => {
    const { data, error, loading, request } = useFetch();

    useEffect(() => {
        if (!photo) return;

        const photoData = PHOTO_GET(photo.id);
        if (!photoData || !photoData.url || !photoData.options) {
            console.error("PHOTO_GET não retornou os dados esperados:", photoData);
            return;
        }

        request(photoData.url, photoData.options);
    }, [photo, request]);

    function handleOutSideClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === event.currentTarget) {
            setModalPhoto(null);
        }
    }

    return (
        <div className={styles.modal} onClick={handleOutSideClick}>
            {error && <Error error={error} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}
        </div>
    );
};

export default FeedModal;
