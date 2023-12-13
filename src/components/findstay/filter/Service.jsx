import { useState, useEffect } from 'react';
import { TfiClose } from 'react-icons/tfi';

export default function Service({ onParking, onCook, onPet, onBreakfast }){

    const [isParking, setIsparking] = useState(0);
    const [isCook, setIsCook] = useState(0);
    const [isPet, setIsPet] = useState(0);
    const [isBreakfast, setIsBreakfast] = useState(0);

    /**
     * 주차
     */
    useEffect(()=>{
        const parking = document.querySelector('.parking');

        const handleParkingClick = () => {
            if(parking.classList.contains('possible')){
                parking.classList.remove('possible');
                setIsparking((prevIsParking) => (prevIsParking === 0 ? 1 : 0));
            }else{
                parking.classList.add('possible');
                setIsparking(1);
            }
        }

        parking.addEventListener('click', handleParkingClick);

        return() => {
            parking.removeEventListener('click',handleParkingClick);
        };
    }, []);

    /**
     * 조리
     */
    useEffect(()=>{
        const cook = document.querySelector('.cook');

        const handleCookClick = () => {
            if(cook.classList.contains('possible')){
                cook.classList.remove('possible');
                setIsCook((prevIsCook) => (prevIsCook === 0 ? 1 : 0));
            }else{
                cook.classList.add('possible');
                setIsCook(1);
            }
        }

        cook.addEventListener('click', handleCookClick);

        return() => {
            cook.removeEventListener('click',handleCookClick);
        };
    }, []);

    /**
     * 반려동물
     */
    useEffect(()=>{
        const pet = document.querySelector('.pet');

        const handlePetClick = () => {
            if(pet.classList.contains('possible')){
                pet.classList.remove('possible');
                setIsPet((prevIsPet) => (prevIsPet === 0 ? 1 : 0));
            }else{
                pet.classList.add('possible');
                setIsPet(1);
            }
        }

        pet.addEventListener('click', handlePetClick);

        return() => {
            pet.removeEventListener('click',handlePetClick);
        };
    }, []);

    /**
     * 조식
     */
    useEffect(()=>{
        const breakfast = document.querySelector('.breakfast');

        const handleBreakfastClick = () => {
            if(breakfast.classList.contains('possible')){
                breakfast.classList.remove('possible');
                setIsBreakfast((prevIsBreakfast) => (prevIsBreakfast === 0 ? 1 : 0));
            }else{
                breakfast.classList.add('possible');
                setIsBreakfast(1);
            }
        }

        breakfast.addEventListener('click', handleBreakfastClick);

        return() => {
            breakfast.removeEventListener('click',handleBreakfastClick);
        };
    }, []);

    const handleParking = (click) => {
        onParking(click)
    }
    const handleCook = (click) => {
        onCook(click)
    }
    const handlePet = (click) => {
        onPet(click)
    }
    const handleBreakfast = (click) => {
        onBreakfast(click)
    }

    return(
        <div className='service'>
            <div className='service_select'>
                <button className='parking' type='button' onClick={() => handleParking(isParking)}>
                    <div>주차</div>
                    {isParking ? <TfiClose /> : ''}
                </button>
                <button className='cook' type='button' onClick={() => handleCook(isCook)}>
                    <div>조리</div>
                    {isCook ? <TfiClose /> : ''}
                </button>
                <button className='pet' type='button' onClick={() => handlePet(isPet)}>
                    <div>반려동물</div>
                    {isPet ? <TfiClose /> : ''}
                </button>
                <button className='breakfast' type='button' onClick={() => handleBreakfast(isBreakfast)}>
                    <div>조식</div>
                    {isBreakfast ? <TfiClose /> : ''}
                </button>
            </div>
        </div>
    );
}