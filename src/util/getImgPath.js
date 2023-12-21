const DEFAULT_IMG = {
    noImage : '/assets/images/etc/no_image.jpeg',
    notice :`/assets/images/etc/notice_default.jpeg`,
    userProfile : '/assets/images/etc/user_profile_default.jpg',
    acc : `/assets/images/etc/acc_default_image.jpg`
}

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN;

const getImgPath = {
    acc : filename => 
    filename ? `${apiBaseUrl}/getimg/acc/${filename}` : DEFAULT_IMG.acc,

    room : filename => 
    filename ? `${apiBaseUrl}/getimg/room/${filename}` : DEFAULT_IMG.noImage,

    notice : filename =>  
    filename ? `${apiBaseUrl}/getimg/notice/${filename}` : DEFAULT_IMG.notice,

    review : filename => 
    filename ? `${apiBaseUrl}/getimg/review/${filename}` : DEFAULT_IMG.noImage,

    userProfile : filename => 
    filename ? `${apiBaseUrl}/getimg/userprofile/${filename}` : DEFAULT_IMG.userProfile
}

export default getImgPath;

