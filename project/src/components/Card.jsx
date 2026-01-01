import React from "react";
import { Card as HeroCard, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { MdEdit, MdDelete } from "react-icons/md";

const Card = ({
    title,
    description,
    value,
    icon,
    image,
    onEdit,
    onDelete,
    showActions = false,
    className = "",
}) => {
    return (
        <HeroCard
            shadow="sm"
            className={`p-3 rounded-lg border border-gray-300 bg-white ${className}`}
        >
            {title && (
                <CardHeader className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {icon && <span>{icon}</span>}
                        <p className="uppercase font-bold text-gray-700 text-sm">{title}</p>
                    </div>
                </CardHeader>
            )}
            <CardBody className="py-2 flex flex-col gap-2">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="object-cover rounded-lg w-full h-40"
                    />
                )}

                {value && <p className="text-3xl font-bold">{value}</p>}

                {description && <p className="text-gray-600 text-sm line-clamp-2">{description}</p>}
            </CardBody>
            {showActions && (onEdit || onDelete) && (
                <CardFooter className="flex justify-start items-center gap-2">
                    {onEdit && (
                        <button
                            className="bg-white px-2 py-1 rounded-full shadow hover:bg-gray-200"
                            onClick={onEdit}
                        >
                            <MdEdit size={18} className="text-blue-600" />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            className="bg-white px-2 py-1 rounded-full shadow hover:bg-gray-200"
                            onClick={onDelete}
                        >
                            <MdDelete size={18} className="text-red-600" />
                        </button>
                    )}
                </CardFooter>
            )}
        </HeroCard>
    );
};

export default Card;
