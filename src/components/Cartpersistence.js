import React, {useState, useEffect} from 'react';

const { useEffect, useState } = require("react")

const PersistanceCart = () => {
    let [cart,setCart] = useState([])
    let localCart = localStorage.getItem('cart')

    const addToCart =(item) => {
        let cartCopy = [...cart]
        let {id} = item
        let existingItem = cartCopy.find(cartItem => cartItem.id == id)

        if (existingItem) {
            existingItem.quantity += item.quantity
        }else{
            cartCopy.push(item)
        }

    }
    setCart(cartCopy)
    let stringCart = JSON.stringify(cartCopy)
    localStorage.setItem('cart', stringCart)

    const updateCart = (itemId, amount) => {
        let cartCopy = [...cart]
        let existentItem = cartCopy.find(item => item.id == itemid)
        if (!existentItem) return
        existentItem.quantity += amount

        if (existentItem.quantity <= 0) {
            cartCopy = cartCopy.filter(item => item.id != itemid)
        }
        setCart(cartCopy)

        let cart
    }

    const removeItem = (itemid) => {
        let cartCopy = [...cart]
        cartCopy = cartCopy.filter(item => item.id != itemid)
        setCart(cartCopy)

    }

    useEffect(() => {
        localCart = JSON.parse(localCart)
        if (localCart) setCart(localCart)
    }, [])


    return <div></div>
}