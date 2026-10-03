import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

type Deal = {
  id: string;

  title: string;

  price: number;

  imageUrl: string;

  images: string[];

  cause: string;

  description: string;

  url: string;

  user?: {
    name: string;
    avatarUrl: string;
  };
};

const deals: Deal[] = [
  {
    id: '1',

    title:
      'Weekend Yoga Package',

    price: 2500,

    imageUrl:
      'https://picsum.photos/seed/yoga1/800/500',

    images: [
      'https://picsum.photos/seed/yoga1/800/500',
      'https://picsum.photos/seed/yoga2/800/500',
      'https://picsum.photos/seed/yoga3/800/500',
    ],

    cause: 'Wellness',

    description:
      'A weekend yoga package including group sessions, guided exercises, and relaxation activities.',

    url:
      'https://example.com/deals/1',

    user: {
      name: 'Sarah Miller',

      avatarUrl:
        'https://picsum.photos/seed/sarah/100/100',
    },
  },

  {
    id: '2',

    title:
      'Premium Coffee Tasting',

    price: 1800,

    imageUrl:
      'https://picsum.photos/seed/coffee1/800/500',

    images: [
      'https://picsum.photos/seed/coffee1/800/500',
      'https://picsum.photos/seed/coffee2/800/500',
      'https://picsum.photos/seed/coffee3/800/500',
    ],

    cause: 'Food & Drink',

    description:
      'Discover several specialty coffees and learn about beans, roasting methods, and brewing techniques.',

    url:
      'https://example.com/deals/2',

    user: {
      name: 'Michael Brown',

      avatarUrl:
        'https://picsum.photos/seed/michael/100/100',
    },
  },

  {
    id: '3',

    title:
      'Italian Dinner for Two',

    price: 4200,

    imageUrl:
      'https://picsum.photos/seed/italian1/800/500',

    images: [
      'https://picsum.photos/seed/italian1/800/500',
      'https://picsum.photos/seed/italian2/800/500',
      'https://picsum.photos/seed/italian3/800/500',
    ],

    cause: 'Food & Drink',

    description:
      'Enjoy a three-course Italian dinner for two including a starter, main course, and dessert.',

    url:
      'https://example.com/deals/3',

    user: {
      name: 'Anna Rossi',

      avatarUrl:
        'https://picsum.photos/seed/anna/100/100',
    },
  },

  {
    id: '4',

    title:
      'City Photography Workshop',

    price: 3500,

    imageUrl:
      'https://picsum.photos/seed/photo1/800/500',

    images: [
      'https://picsum.photos/seed/photo1/800/500',
      'https://picsum.photos/seed/photo2/800/500',
      'https://picsum.photos/seed/photo3/800/500',
    ],

    cause: 'Education',

    description:
      'A practical city photography workshop covering composition, light, perspective, and street photography techniques.',

    url:
      'https://example.com/deals/4',

    user: {
      name: 'Daniel Lee',

      avatarUrl:
        'https://picsum.photos/seed/daniel/100/100',
    },
  },
];


app.get('/api/deals', (req, res) => {
  const searchTerm =
    typeof req.query.searchTerm === 'string'
      ? req.query.searchTerm.trim().toLowerCase()
      : '';

  const filteredDeals = searchTerm
    ? deals.filter((deal) =>
        deal.title.toLowerCase().includes(searchTerm) ||
        deal.cause.toLowerCase().includes(searchTerm)
      )
    : deals;

  const result = filteredDeals.map((deal) => ({
    id: deal.id,
    title: deal.title,
    price: deal.price,
    imageUrl: deal.imageUrl,
    cause: deal.cause,
  }));

  res.json(result);
});

app.get('/api/deals/:id', (req, res) => {
  const deal = deals.find(
    item => item.id === req.params.id
  );

  if (!deal) {
    return res.status(404).json({
      message: 'Deal not found',
    });
  }

  res.json(deal);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `DealFinder API running on port ${PORT}`
  );
});

