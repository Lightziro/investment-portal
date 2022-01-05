import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../nextjs/ts/types/redux/store.types";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SwiperCore, { Pagination, Navigation } from "swiper";
import { Box, Paper, Skeleton } from "@mui/material";

SwiperCore.use([Navigation]);
export const NewsSliderList: React.FC = () => {
    const news = useSelector((state: StoreData) => state.main.news);

    return (
        <div className="news-list-wrapper">
            <Paper elevation={3}>
                <Box padding={2}>
                    {news ? (
                        <Swiper
                            navigation={true}
                            slidesPerView={5}
                            spaceBetween={5}
                            // pagination={{
                            //     clickable: true,
                            // }}
                            className="mySwiper"
                        >
                            {news.map((item) => (
                                <SwiperSlide>
                                    <div className="swiper-content-wrapper">
                                        {/*<LinkNewsItem*/}
                                        {/*    url={item.url}*/}
                                        {/*    className="link-image-news"*/}
                                        {/*>*/}
                                        {/*    <img*/}
                                        {/*        src={item.image}*/}
                                        {/*        alt={item.headline}*/}
                                        {/*    />*/}
                                        {/*</LinkNewsItem>*/}
                                        {/*<LinkNewsItem*/}
                                        {/*    url={item.url}*/}
                                        {/*    className="link-title-news"*/}
                                        {/*>*/}
                                        {/*    <span className="news-title">*/}
                                        {/*        {item.headline}*/}
                                        {/*    </span>*/}
                                        {/*</LinkNewsItem>*/}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <Skeleton
                            width="100%"
                            height={176}
                            variant="rectangular"
                        />
                    )}
                </Box>
            </Paper>
        </div>
    );
};
