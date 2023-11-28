import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Acc from './Acc';

export default function AccList({accs, area}){

    return(
        <div className="acc_list">
            {accs.map(acc => 
                <Acc key={acc.acc_id} acc={acc} area={area} />
            )}
        </div>
    );
};