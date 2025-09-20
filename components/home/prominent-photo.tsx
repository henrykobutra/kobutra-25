import Image from 'next/image';

interface ProminentPhotoProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ProminentPhoto({ src, alt, caption }: ProminentPhotoProps) {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={600}
            className="w-full h-80 md:h-96 lg:h-[32rem] object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        {caption && (
          <p className="text-sm text-gray-600 mt-3 text-center italic">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
