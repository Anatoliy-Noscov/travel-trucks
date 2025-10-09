import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Camper } from "@/types/campers";
import styles from '@/components/CamperCard/CamperCard';


interface CamperCardProps {
    camper: Camper;
}

