import React, { useState, useEffect } from "react";
import axios from "axios";
import User from '../../Components/Widgets/User';
import Loader from "../../Components/Widgets/Loader";
import { Page, Text, View, Document, PDFDownloadLink, StyleSheet } from "@react-pdf/renderer"
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export default function History() {
   
   const { currentUser, userLoading } = User()
   const [isWatchingOrder, setWatchingOrder] = useState(null)
   const [order, setOrder] = useState(null);

   function changeDate(date) 
   {
      const newDate = new Date(date).toLocaleString('fr-FR', {
         year : "numeric",
         month : "long",
         day : "numeric",
         hour : "2-digit",
         minute : "2-digit"
      })  
      return newDate; 
   }

   const styles = StyleSheet.create({
      title : {
         color : '#4FBEB7',
         textAlign : 'center',
         marginBottom : '20px',
         fontSize : '16px',
         marginTop : '16px'
      },
      titleInfo : {
         color : '#4FBEB7',
         textAlign : 'center',
         padding : '2',
         marginBottom : '10px',
         fontSize : '16px',
      },
      colContainer : {
         display : 'flex',
         flexDirection : 'column',
         marginBottom : '15px',
         padding : '8px',
         border : '2px solid #4FBEB7',
         margin : '8px'
      },
      rowContainer : {
         display : 'flex',
         flexDirection : 'row',
         justifyContent : 'flex-start',
         alignItems : 'center',
         gap : '8px'
      },
      subTitleInformations : {
         fontSize : '12px',
         fontWeight : 'bold'
      },
      informations : {
         fontSize : '10px'
      },
      rowWithPrice : {
         display : 'flex',
         flexDirection : 'row',
         justifyContent : 'space-between'
      },
      informationsWithMargin : {
         fontSize : '12px',
         marginTop : '20px',
      },
      informationsEnd : {
         alignSelf : 'flex-end',
         fontSize : '10px'
      }
   })

   const renderPDF = () => {
      return (
         <Document>
            <Page size="A4">
               <View>
                  <Text style={styles.title}>Détails de la commande {order._id}</Text>
                  <View style={styles.colContainer}>   
                     <View style={styles.rowContainer}>
                        <Text style={styles.subTitleInformations}>Date de la commande : </Text>
                        <Text style={styles.informations}>{changeDate(order.date)}</Text>
                     </View>
                     <View style={styles.rowContainer}>
                        <Text style={styles.subTitleInformations}>N° de la commande : </Text>
                        <Text style={styles.informations}>{order._id}</Text>
                     </View>
                     <View style={styles.rowContainer}>
                        <Text style={styles.subTitleInformations}>Montant de la commande :</Text>
                        <Text style={styles.informations}>{order.totalPrice} €</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.colContainer}>
                        <Text style={styles.titleInfo}>Infos Articles</Text>
                        <Text style={styles.subTitleInformations}>Articles commandés</Text>
                        {order.cart.map((item, index) => (
                           <View key={index} style={styles.rowWithPrice}>
                              <Text style={styles.informations}>{item.quantity} ex. de {item.name}</Text>
                              <Text style={styles.informations}>Prix : {item.price} €</Text>
                           </View>
                        ))}
                        <Text style={styles.informationsWithMargin}>Adresse de livraison :</Text>
                        <Text style={styles.informations}>{order.address.address}</Text>
                        <Text style={styles.informations}>{order.address.city}, {order.address.zipcode}</Text>
                        <Text style={styles.informations}>{order.address.country}</Text>
                     </View>
                     <View style={styles.colContainer}>
                        <Text style={styles.titleInfo}>Infos paiement</Text>
                        <Text style={styles.subTitleInformations}>Mode de paiement : </Text>
                        <Text style={styles.informations}>Visa {order.PaymentForm.card.slice(-5).padStart(8, '*')}</Text>
                        <Text style={styles.informationsWithMargin}>Adresse de facturation :</Text>
                        <Text style={styles.informations}>{order.address.address}</Text>
                        <Text style={styles.informations}>{order.address.city}, {order.address.zipcode}</Text>
                        <Text style={styles.informations}>{order.address.country}</Text>
                        <Text style={styles.informationsEnd}>Montant total : {order.totalPrice} €</Text>
                     </View>
                  </View>
               </View>
            </Page>
         </Document>
      )
   }

   if (userLoading) {

        return <Loader />
    
   }
 
   return (
         <div className="w-3/4 p-4 overflow-auto mx-auto flex flex-col gap-8">
            {currentUser.old_orders && !order && (
               currentUser.old_orders.toReversed().map((order, index) => (
                  <div className="flex flex-col" key={index}> 
                     <div className="bg-gray-200 text-start p-2 rounded-t-xl flex justify-between">
                        <div className="flex gap-8">
                           <div className="flex flex-col">
                              <p>Commande effectuée le :</p>
                              <p>{changeDate(order.date)}</p>
                           </div>
                           <div className="flex flex-col">
                              <p>Total</p>
                              <p>{order.totalPrice.toFixed(2)} €</p>
                           </div>
                           <div className="flex flex-col">
                              <p>Livraison à</p>
                              <Dropdown title={currentUser.email} trigger="hover">
                                 <DropdownItem>
                                    {order.address ? <p>{order.address.address}</p> : <p>bof</p>}
                                    {order.address ? <p>{order.address.city}, {order.address.zipcode}</p> : <p>bof</p>}
                                    {order.address ? <p>{order.address.country}</p> : <p>bof</p>}
                                 </DropdownItem>
                              </Dropdown>
                           </div>
                        </div>
                        <div className="flex">
                           <div className="flex flex-col mr-2">
                              <p>N° de commande : {order._id}</p>
                           </div>
                        </div>
                     </div>
                     <div className="border rounded-b-xl">
                        <div className="flex flex-col justify-start p-4">
                           <p>État de la commande : {order.state}</p>
                        </div>
                        <div className="flex justify-between p-4">
                           <div className="flex gap-8">
                              <img src={`http://localhost:8000/storage/${order.cart[0].img}`} alt="img history" className="w-[50px] h-[50px]"></img>
                              <div className="flex flex-col">
                                 <p>{order.cart[0].name}</p>
                                 <button className="cursor-pointer text-start">Voir article</button>
                              </div>
                           </div>
                           <div>
                              <p onClick={() => {setOrder(order)}} className="cursor-pointer">Voir détails de la commande</p>
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            )}
            {
               order ? 
               <div className="flex flex-col gap-6">
                  <p className="text-2xl font-bold">Détails de la commande</p>
                  <div className="flex justify-between p-6">
                     <div className="flex gap-6">
                        <p>Commande effectuée le {changeDate(order.date)}</p>
                        <p>|</p>
                        <p>N° de commande : {order._id}</p>
                     </div>
                     <PDFDownloadLink document={renderPDF()} fileName="facture.pdf">
                        {('Télécharger la facture')}
                     </PDFDownloadLink>
                  </div>
                  <div className="border rounded-xl flex justify-between p-6">
                     <div className="flex flex-col">
                        <p className="font-bold">Adresse de livraison</p>
                        {order.address ? <p>{order.address.address}</p> : <p>bof</p>}
                        {order.address ? <p>{order.address.city}, {order.address.zipcode}</p> : <p>bof</p>}
                        {order.address ? <p>{order.address.country}</p> : <p>bof</p>}
                     </div>
                     <div className="flex flex-col">
                        <p className="font-bold">Mode de paiement</p>
                        <p>{order.PaymentForm.card.slice(-5).padStart(8, '*')}</p>
                     </div>
                     <div className="flex flex-col">
                        <p className="font-bold">Prix total</p>
                        <p>Article : {order.totalPrice.toFixed(2)} €</p>
                     </div>
                  </div>
                  <div className="border rounded-xl p-6">
                     <p className="font-bold text-xl mb-4">Livrée : date ?</p>
                     {
                        order.cart.map((items, index) => (
                           <div key={index} className="flex gap-4">
                              <img src={`http://localhost:8000/storage/${items.img}`} alt="article img" className="w-[100px] h-[100px]"></img>
                              <div className="flex flex-col">
                                 <p>{items.name}</p>
                                 <p className="text-[#4FBEB7]">{items.price.toFixed(2)} €</p>
                                 <p>x {items.quantity}</p>
                              </div>
                           </div>
                        ))
                     }
                  </div>
                  {console.log(order)}
               </div> 
               : 
               null
            }
         </div>
         )
}