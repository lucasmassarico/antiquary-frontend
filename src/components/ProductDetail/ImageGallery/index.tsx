import React, { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import Image from "next/image";
import { Product } from "@/types";
import { api } from "@/lib/axios";
import { getImageUrl } from "@/helpers";

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

    useEffect(() => {
        fetchProductImages();
    }, [product]);

    const fetchProductImages = async () => {
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
    };

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
                    // sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </Paper>

            {/* Thumbnails */}
            {images.length > 1 && (
                <Grid container spacing={1}>
                    {images.map((imageName, index) => (
                        <Grid item key={index} xs={3} md={2}>
                            <Paper
                                elevation={selectedImage === imageName ? 3 : 1}
                                sx={{
                                    cursor: "pointer",
                                    position: "relative",
                                    width: "100%",
                                    paddingTop: "100%",
                                }}
                                onClick={() => setSelectedImage(imageName)}
                            >
                                <Image
                                    src={getImageUrl(imageName)}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ImageGallery;
