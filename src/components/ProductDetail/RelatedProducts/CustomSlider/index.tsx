import { styled } from "@mui/system";
import Slider from "react-slick";

export const CustomSlider = styled(Slider)({
    ".slick-prev:before, .slick-next:before": {
        color: "black",
    },
});
