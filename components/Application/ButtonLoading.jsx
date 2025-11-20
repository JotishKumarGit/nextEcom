import React from 'react';
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import {cn} from "@/lib/utils"


function ButtonLoading({ type, text, loading, className, onClick, ...props }) {
    return (
        <Button size="sm" variant="outline"
            type={type}
            disabled={loading}
            onClick={onClick}
            className={cn("", className)}
            {...props} >
            {loading && <Spinner />} {text}
        </Button>
    )
}

export default ButtonLoading;
