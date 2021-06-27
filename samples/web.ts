import { h2, on } from 'shuutils'
import './styles.css'

on('load', () => {
  document.body.classList.add('bg-gray-200')
  document.body.append(h2('text-2xl text-blue-600 bg-gray-100 mt-4 text-center font-light', 'with a dynamic blue subtitle'))
})
