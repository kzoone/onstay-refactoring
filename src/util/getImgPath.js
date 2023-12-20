const DEFAULT_IMG = {
    noImage : '/assets/images/etc/no_image.jpeg',
    notice :`/assets/images/etc/notice_default.jpeg`,
    userProfile : '/assets/images/etc/user_profile_default.jpg'
}

const getImgPath = {
    acc : filename => 
    filename ? `http://localhost:8000/getimg/acc/${filename}` : DEFAULT_IMG.noImage,

    room : filename => 
    filename ? `http://localhost:8000/getimg/room/${filename}` : DEFAULT_IMG.noImage,

    notice : filename =>  
    filename ? `http://localhost:8000/getimg/notice/${filename}` : DEFAULT_IMG.notice,

    review : filename => 
    filename ? `http://localhost:8000/getimg/review/${filename}` : DEFAULT_IMG.noImage,

    userProfile : filename => 
    filename ? `http://localhost:8000/getimg/userprofile/${filename}` : DEFAULT_IMG.userProfile
}

export default getImgPath;

