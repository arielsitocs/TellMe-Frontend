"use client"

import Image from 'next/image';

import { useRouter } from 'next/navigation';

import SettingTypes from '../../types/setting-types';

import dropDownIcon from '@/public/drop-down-icon.svg';

const Setting = ({ title, description, icon, iconcolor, iconbgcolor, linkto, action }: SettingTypes) => {
    const router = useRouter();

    const handleSetting = () => {
        if(linkto && !action) {
            router.push(`${linkto}`)
        }
        if(action) {
            action();
        }
    }

    return (
        <div className="flex items-center px-5 py-3 hover:bg-transparent-purple transition-all cursor-pointer" onClick={handleSetting}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: iconbgcolor }}>
                <Image src={icon} width={22} height={22} alt={'Setting Icon'} style={{ stroke: iconcolor }} />
            </div>
            <div className="ml-3">
                <h1 className="text-main-text font-medium">{title}</h1>
                <p className="text-terciary-text text-sm">{description}</p>
            </div>
            <div className="ml-auto hover:opacity-60 cursor-pointer">
                <Image src={dropDownIcon} width={28} height={28} alt="Drop Down Icon" />
            </div>
        </div>
    );
};

export default Setting;