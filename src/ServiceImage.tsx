import images from './service-images.json';

export default function ServiceImage({slug,hero=false}:{slug:string;hero?:boolean}) {
  const photo=images[slug as keyof typeof images];
  return <figure className={`service-photo${hero?' service-photo-hero':''}`}>
    <div className="service-photo-frame"><img
      src={`/images/services/${slug}-800.webp`}
      srcSet={[480,800,1200].map(w=>`/images/services/${slug}-${w}.webp ${w}w`).join(', ')}
      sizes={hero?'(max-width: 760px) 90vw, 45vw':'(max-width: 700px) 85vw, 40vw'}
      width={photo.width} height={photo.height} alt={photo.alt}
      loading={hero?'eager':'lazy'} decoding="async" style={{objectPosition:photo.position}}/>
    </div>
    <figcaption>Escena ilustrativa · <a href={photo.url} target="_blank" rel="noreferrer">{photo.author} / {photo.bank}</a></figcaption>
  </figure>;
}
