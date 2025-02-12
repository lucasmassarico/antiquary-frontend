import React, { useEffect, useState, useCallback } from "react";
import { Box, Grid, Paper } from "@mui/material";
import Image from "next/image";
import { Product } from "@/types";
import { api } from "@/lib/axios";
import { getImageUrl } from "@/helpers";
import { CustomSlider } from "../RelatedProducts/CustomSlider"; // Importando o CustomSlider

interface ImageGalleryProps {
    product: Product;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState<string>(
        product.image_thumbnail_name
    );
    const [images, setImages] = useState<string[]>([]);
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [zoomStyle, setZoomStyle] = useState<any>({});

    const SLIDER_THRESHOLD = 5; // Defina o limite de imagens para ativar o slider

    // Use useCallback para memoizar a função e evitar que ela seja recriada a cada renderização
    const fetchProductImages = useCallback(async () => {
        try {
            const response = await api.get(
                `products_images/find/by_product_id/${product.id}`
            );

            if (Array.isArray(response.data)) {
                const imagePaths = response.data.map(
                    (img: any) => img.image_path
                );
                setImages([product.image_thumbnail_name, ...imagePaths]);
            } else {
                console.warn("No images registered for the product.");
                setImages([product.image_thumbnail_name]);
            }
        } catch (error) {
            console.error("Failed to fetch product images:", error);
            setImages([product.image_thumbnail_name]);
        }
    }, [product.id, product.image_thumbnail_name]); // Defina as dependências adequadas

    useEffect(() => {
        fetchProductImages();
    }, [fetchProductImages]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isZoomed) {
            const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect();
            const x = ((e.pageX - left) / width) * 100;
            const y = ((e.pageY - top) / height) * 100;
            setZoomStyle({
                transformOrigin: `${x}% ${y}%`,
                transform: "scale(2)",
            });
        }
    };

    const handleZoomToggle = () => {
        setIsZoomed(!isZoomed);
        setZoomStyle(isZoomed ? {} : { transform: "scale(2)" });
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 900, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
        ],
    };

    return (
        <Box>
            {/* Main Image with zoom effect */}
            <Paper
                elevation={1}
                sx={{
                    mb: 2,
                    position: "relative",
                    width: "100%",
                    height: 500,
                    overflow: "hidden",
                    cursor: isZoomed ? "zoom-out" : "zoom-in",
                }}
                onMouseMove={handleMouseMove}
                onClick={handleZoomToggle}
            >
                <Image
                    src={getImageUrl(selectedImage)}
                    alt={product.name}
                    fill
                    style={{
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                        ...zoomStyle,
                    }}
                    priority
                />
            </Paper>

            {/* Thumbnails */}
            {images.length > 1 && (
                <>
                    {images.length > SLIDER_THRESHOLD ? (
                        // Slider para muitas imagens
                        <CustomSlider {...sliderSettings}>
                            {images.map((imageName, index) => (
                                <Box key={index} sx={{}}>
                                    <Paper
                                        elevation={
                                            selectedImage === imageName ? 4 : 1
                                        }
                                        sx={{
                                            overflow: "hidden",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            cursor: "pointer",
                                            position: "relative",
                                            paddingTop: "70%",
                                            marginRight: "10px",
                                            borderRadius: "5px",
                                            boxShadow:
                                                selectedImage === imageName
                                                    ? "0 0 10px 2px rgba(11, 63, 48, 0.6)" // Destaque visual na imagem selecionada
                                                    : "3px 3px 2px rgba(0, 0, 0, 0.3)",
                                            border:
                                                selectedImage === imageName
                                                    ? "2px solid #0B3F30"
                                                    : "none",
                                            transition: "all 0.3s ease-in-out", // Animação suave na troca de borda
                                        }}
                                        onClick={() =>
                                            setSelectedImage(imageName)
                                        }
                                    >
                                        <Box
                                            width="100%"
                                            sx={{
                                                overflow: "hidden",
                                                display: "flex",
                                            }}
                                        >
                                            {" "}
                                            <Image
                                                src={getImageUrl(imageName)}
                                                alt={product.name}
                                                fill
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "5px",
                                                }}
                                                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                            />
                                        </Box>
                                    </Paper>
                                </Box>
                            ))}
                        </CustomSlider>
                    ) : (
                        // Grid normal para poucas imagens
                        <Grid container spacing={1}>
                            {images.map((imageName, index) => (
                                <Grid item key={index} xs={3} md={2}>
                                    <Paper
                                        elevation={
                                            selectedImage === imageName ? 4 : 1
                                        }
                                        sx={{
                                            cursor: "pointer",
                                            position: "relative",
                                            width: "100%",
                                            paddingTop: "100%",
                                            overflow: "hidden",
                                            border:
                                                selectedImage === imageName
                                                    ? "2px solid #0B3F30"
                                                    : "none",
                                            boxShadow:
                                                selectedImage === imageName
                                                    ? "0 0 10px 2px rgba(11, 63, 48, 0.6)"
                                                    : "3px 3px 2px rgba(0, 0, 0, 0.3)",
                                            transition: "all 0.3s ease-in-out", // Animação suave
                                        }}
                                        onClick={() =>
                                            setSelectedImage(imageName)
                                        }
                                    >
                                        <Image
                                            src={getImageUrl(imageName)}
                                            alt={product.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority
                                        />
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </Box>
    );
};

export default ImageGallery;
