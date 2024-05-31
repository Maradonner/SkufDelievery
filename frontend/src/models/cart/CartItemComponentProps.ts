import {CartItemProps} from "./CartItemProps.ts";

export interface CartItemComponentProps {
    item: CartItemProps;
    onIncrease: () => void;
    onDecrease: () => void;
}