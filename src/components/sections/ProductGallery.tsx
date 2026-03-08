import React from 'react';
import { Layers, Box, Hexagon, Info } from 'lucide-react';

const products = [
    {
        id: 'hexagon',
        name: 'Hexagon Premium',
        description: 'Modern hexagonal design for contemporary landscapes. High load-bearing capacity and interlocking strength.',
        icon: <Hexagon className="text-primary w-8 h-8" />,
        image: '/images/showcase-1.jpg',
        features: ['Modern Look', 'High Strength', 'Anti-Slip']
    },
    {
        id: 'square',
        name: 'Classic Square',
        description: 'The timeless choice for formal driveways and pathways. Precision-engineered for a seamless finish.',
        icon: <Box className="text-primary w-8 h-8" />,
        image: '/images/showcase-2.jpg',
        features: ['Timeless Design', 'Easy Installation', 'Cost-Effective']
    },
    {
        id: 'i-shape',
        name: 'Heavy Duty I-Shape',
        description: 'Maximum interlocking capability for commercial and heavy traffic zones. Engineered for extreme durability.',
        icon: <Layers className="text-primary w-8 h-8" />,
        image: '/images/showcase-3.jpg',
        features: ['Max Interlock', 'Heavy Traffic', 'Industrial Grade']
    }
];


const ProductGallery = () => {
    return (
        <section id="products" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Our Collection</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">
                        Durable Tiles for <span className="text-primary italic">Every Purpose</span>
                    </h3>
                    <p className="text-lg text-secondary/60 leading-relaxed">
                        Choose from our range of premium interlocking tiles, each designed to provide a lifetime of durability and aesthetic appeal.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-neutral-50 border border-neutral-100 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-6">
                                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                        <div className="text-secondary">
                                            {product.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex-grow flex flex-col">
                                <h4 className="text-2xl font-bold text-secondary mb-4">{product.name}</h4>
                                <p className="text-secondary/60 mb-8 flex-grow leading-relaxed">{product.description}</p>


                                <div className="space-y-3 pt-6 border-t border-neutral-200">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm font-semibold text-secondary/80">
                                            <Info size={14} className="text-primary mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGallery;
