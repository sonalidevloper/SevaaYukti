const mongoose = require('mongoose');
const Asha = require('./models/Asha');
require('dotenv').config();

const seedAshaWorkers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📊 Connected to MongoDB');

    // Check if ASHAs already exist
    const existingCount = await Asha.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  ${existingCount} ASHA workers already exist in database`);
      console.log('🗑️  Clearing existing data...');
      await Asha.deleteMany({});
      console.log('✅ Database cleared');
    }

    // Comprehensive ASHA workers data with hierarchical locations
    const ashaWorkers = [
      // Khordha District - Bhubaneswar Block
      {
        workerId: 'ASHA001',
        name: 'Sunita Behera',
        phone: '9876543210',
        area: 'Bhubaneswar Rural',
        address: 'Village Pahala, Block Bhubaneswar',
        village: 'Pahala',
        pinCode: '751010',
        gramPanchayat: 'Pahala',
        district: 'Khordha',
        block: 'Bhubaneswar',
        experience: 5,
        languages: ['Odia', 'Hindi', 'English']
      },
      {
        workerId: 'ASHA002',
        name: 'Anita Nayak',
        phone: '9876543220',
        area: 'Bhubaneswar Rural',
        address: 'Village Patia, Block Bhubaneswar',
        village: 'Patia',
        pinCode: '751024',
        gramPanchayat: 'Patia',
        district: 'Khordha',
        block: 'Bhubaneswar',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA003',
        name: 'Mamata Das',
        phone: '9876543221',
        area: 'Bhubaneswar Rural',
        address: 'Village Jatni, Block Bhubaneswar',
        village: 'Jatni',
        pinCode: '752050',
        gramPanchayat: 'Jatni',
        district: 'Khordha',
        block: 'Bhubaneswar',
        experience: 4,
        languages: ['Odia', 'English']
      },
      
      // Khordha District - Tangi Block
      {
        workerId: 'ASHA004',
        name: 'Sanjukta Swain',
        phone: '9876543222',
        area: 'Tangi Rural',
        address: 'Village Tangi, Block Tangi',
        village: 'Tangi',
        pinCode: '754022',
        gramPanchayat: 'Tangi',
        district: 'Khordha',
        block: 'Tangi',
        experience: 7,
        languages: ['Odia', 'Hindi']
      },
      
      // Cuttack District - Cuttack Sadar Block
      {
        workerId: 'ASHA005',
        name: 'Mamita Pradhan',
        phone: '9876543211',
        area: 'Cuttack District',
        address: 'Village Choudwar, Block Cuttack Sadar',
        village: 'Choudwar',
        pinCode: '754071',
        gramPanchayat: 'Choudwar',
        district: 'Cuttack',
        block: 'Cuttack Sadar',
        experience: 7,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA006',
        name: 'Rina Sahoo',
        phone: '9876543223',
        area: 'Cuttack District',
        address: 'Village Bidanasi, Block Cuttack Sadar',
        village: 'Bidanasi',
        pinCode: '753014',
        gramPanchayat: 'Bidanasi',
        district: 'Cuttack',
        block: 'Cuttack Sadar',
        experience: 5,
        languages: ['Odia']
      },
      
      // Cuttack District - Banki Block
      {
        workerId: 'ASHA007',
        name: 'Sarita Mohanty',
        phone: '9876543224',
        area: 'Cuttack District',
        address: 'Village Banki, Block Banki',
        village: 'Banki',
        pinCode: '754008',
        gramPanchayat: 'Banki',
        district: 'Cuttack',
        block: 'Banki',
        experience: 8,
        languages: ['Odia', 'Hindi']
      },
      
      // Puri District - Nimapara Block
      {
        workerId: 'ASHA008',
        name: 'Saraswati Sahu',
        phone: '9876543212',
        area: 'Puri Rural',
        address: 'Village Konark, Block Nimapara',
        village: 'Konark',
        pinCode: '752111',
        gramPanchayat: 'Konark',
        district: 'Puri',
        block: 'Nimapara',
        experience: 3,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA009',
        name: 'Gayatri Jena',
        phone: '9876543225',
        area: 'Puri Rural',
        address: 'Village Nimapara, Block Nimapara',
        village: 'Nimapara',
        pinCode: '752106',
        gramPanchayat: 'Nimapara',
        district: 'Puri',
        block: 'Nimapara',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA021',
        name: 'Basanti Nayak',
        phone: '9876543240',
        area: 'Puri Rural',
        address: 'Village Balanga, Block Nimapara',
        village: 'Balanga',
        pinCode: '752109',
        gramPanchayat: 'Balanga',
        district: 'Puri',
        block: 'Nimapara',
        experience: 4,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA022',
        name: 'Pramila Sahoo',
        phone: '9876543241',
        area: 'Puri Rural',
        address: 'Village Gop, Block Nimapara',
        village: 'Gop',
        pinCode: '752110',
        gramPanchayat: 'Gop',
        district: 'Puri',
        block: 'Nimapara',
        experience: 7,
        languages: ['Odia', 'Hindi']
      },
      
      // Puri District - Satyabadi Block
      {
        workerId: 'ASHA010',
        name: 'Chandramani Panda',
        phone: '9876543226',
        area: 'Puri Rural',
        address: 'Village Satyabadi, Block Satyabadi',
        village: 'Satyabadi',
        pinCode: '752002',
        gramPanchayat: 'Satyabadi',
        district: 'Puri',
        block: 'Satyabadi',
        experience: 5,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA023',
        name: 'Sumitra Pradhan',
        phone: '9876543242',
        area: 'Puri Rural',
        address: 'Village Sukal, Block Satyabadi',
        village: 'Sukal',
        pinCode: '752014',
        gramPanchayat: 'Sukal',
        district: 'Puri',
        block: 'Satyabadi',
        experience: 6,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA024',
        name: 'Kalpana Biswal',
        phone: '9876543243',
        area: 'Puri Rural',
        address: 'Village Pipili, Block Satyabadi',
        village: 'Pipili',
        pinCode: '752104',
        gramPanchayat: 'Pipili',
        district: 'Puri',
        block: 'Satyabadi',
        experience: 8,
        languages: ['Odia', 'Hindi']
      },
      
      // Puri District - Puri Sadar Block
      {
        workerId: 'ASHA025',
        name: 'Anjali Mohanty',
        phone: '9876543244',
        area: 'Puri Town',
        address: 'Village Balagandi, Block Puri Sadar',
        village: 'Balagandi',
        pinCode: '752002',
        gramPanchayat: 'Balagandi',
        district: 'Puri',
        block: 'Puri Sadar',
        experience: 5,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA026',
        name: 'Minati Rath',
        phone: '9876543245',
        area: 'Puri Town',
        address: 'Village Penthakata, Block Puri Sadar',
        village: 'Penthakata',
        pinCode: '752001',
        gramPanchayat: 'Penthakata',
        district: 'Puri',
        block: 'Puri Sadar',
        experience: 4,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA027',
        name: 'Renuka Das',
        phone: '9876543246',
        area: 'Puri Town',
        address: 'Village Chandrabhaga, Block Puri Sadar',
        village: 'Chandrabhaga',
        pinCode: '752001',
        gramPanchayat: 'Chandrabhaga',
        district: 'Puri',
        block: 'Puri Sadar',
        experience: 6,
        languages: ['Odia', 'Hindi', 'English']
      },
      
      // Puri District - Krushnaprasad Block
      {
        workerId: 'ASHA028',
        name: 'Subhadra Behera',
        phone: '9876543247',
        area: 'Puri Rural',
        address: 'Village Krushnaprasad, Block Krushnaprasad',
        village: 'Krushnaprasad',
        pinCode: '752012',
        gramPanchayat: 'Krushnaprasad',
        district: 'Puri',
        block: 'Krushnaprasad',
        experience: 7,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA029',
        name: 'Sabita Nayak',
        phone: '9876543248',
        area: 'Puri Rural',
        address: 'Village Delang, Block Krushnaprasad',
        village: 'Delang',
        pinCode: '752011',
        gramPanchayat: 'Delang',
        district: 'Puri',
        block: 'Krushnaprasad',
        experience: 5,
        languages: ['Odia', 'Hindi']
      },
      
      // Puri District - Brahmagiri Block
      {
        workerId: 'ASHA030',
        name: 'Indira Swain',
        phone: '9876543249',
        area: 'Puri Rural',
        address: 'Village Brahmagiri, Block Brahmagiri',
        village: 'Brahmagiri',
        pinCode: '752013',
        gramPanchayat: 'Brahmagiri',
        district: 'Puri',
        block: 'Brahmagiri',
        experience: 6,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA031',
        name: 'Manaswini Panda',
        phone: '9876543250',
        area: 'Puri Rural',
        address: 'Village Sakhigopal, Block Brahmagiri',
        village: 'Sakhigopal',
        pinCode: '752014',
        gramPanchayat: 'Sakhigopal',
        district: 'Puri',
        block: 'Brahmagiri',
        experience: 4,
        languages: ['Odia', 'Hindi']
      },
      
      // Puri District - Kanas Block
      {
        workerId: 'ASHA032',
        name: 'Archana Bisoi',
        phone: '9876543251',
        area: 'Puri Rural',
        address: 'Village Kanas, Block Kanas',
        village: 'Kanas',
        pinCode: '752085',
        gramPanchayat: 'Kanas',
        district: 'Puri',
        block: 'Kanas',
        experience: 5,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA033',
        name: 'Dipanjali Mohapatra',
        phone: '9876543252',
        area: 'Puri Rural',
        address: 'Village Bhanapur, Block Kanas',
        village: 'Bhanapur',
        pinCode: '752061',
        gramPanchayat: 'Bhanapur',
        district: 'Puri',
        block: 'Kanas',
        experience: 7,
        languages: ['Odia', 'Hindi']
      },
      
      // Puri District - Astaranga Block
      {
        workerId: 'ASHA034',
        name: 'Lilabati Parida',
        phone: '9876543253',
        area: 'Puri Coastal',
        address: 'Village Astaranga, Block Astaranga',
        village: 'Astaranga',
        pinCode: '752109',
        gramPanchayat: 'Astaranga',
        district: 'Puri',
        block: 'Astaranga',
        experience: 6,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA035',
        name: 'Sushama Sahoo',
        phone: '9876543254',
        area: 'Puri Coastal',
        address: 'Village Kakatpur, Block Astaranga',
        village: 'Kakatpur',
        pinCode: '752108',
        gramPanchayat: 'Kakatpur',
        district: 'Puri',
        block: 'Astaranga',
        experience: 5,
        languages: ['Odia', 'Hindi']
      },
      
      // Balasore District - Balasore Block
      {
        workerId: 'ASHA011',
        name: 'Jhunu Das',
        phone: '9876543213',
        area: 'Balasore District',
        address: 'Village Remuna, Block Balasore',
        village: 'Remuna',
        pinCode: '756019',
        gramPanchayat: 'Remuna',
        district: 'Balasore',
        block: 'Balasore',
        experience: 8,
        languages: ['Odia', 'Hindi', 'Bengali']
      },
      {
        workerId: 'ASHA012',
        name: 'Swarnalata Rath',
        phone: '9876543227',
        area: 'Balasore District',
        address: 'Village Soro, Block Balasore',
        village: 'Soro',
        pinCode: '756045',
        gramPanchayat: 'Soro',
        district: 'Balasore',
        block: 'Balasore',
        experience: 4,
        languages: ['Odia', 'Hindi']
      },
      
      // Sambalpur District - Sambalpur Block
      {
        workerId: 'ASHA013',
        name: 'Pratima Nayak',
        phone: '9876543214',
        area: 'Sambalpur Rural',
        address: 'Village Burla, Block Sambalpur',
        village: 'Burla',
        pinCode: '768017',
        gramPanchayat: 'Burla',
        district: 'Sambalpur',
        block: 'Sambalpur',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA014',
        name: 'Minati Dash',
        phone: '9876543228',
        area: 'Sambalpur Rural',
        address: 'Village Ainthapali, Block Sambalpur',
        village: 'Ainthapali',
        pinCode: '768004',
        gramPanchayat: 'Ainthapali',
        district: 'Sambalpur',
        block: 'Sambalpur',
        experience: 7,
        languages: ['Odia']
      },
      
      // Ganjam District - Digapahandi Block
      {
        workerId: 'ASHA015',
        name: 'Ranjita Behera',
        phone: '9876543215',
        area: 'Berhampur',
        address: 'Village Digapahandi, Block Digapahandi',
        village: 'Digapahandi',
        pinCode: '761012',
        gramPanchayat: 'Digapahandi',
        district: 'Ganjam',
        block: 'Digapahandi',
        experience: 4,
        languages: ['Odia', 'Telugu']
      },
      {
        workerId: 'ASHA016',
        name: 'Sumitra Patra',
        phone: '9876543229',
        area: 'Berhampur',
        address: 'Village Bhanjanagar, Block Digapahandi',
        village: 'Bhanjanagar',
        pinCode: '761126',
        gramPanchayat: 'Bhanjanagar',
        district: 'Ganjam',
        block: 'Digapahandi',
        experience: 5,
        languages: ['Odia', 'Telugu']
      },
      
      // Kendrapara District - Pattamundai Block
      {
        workerId: 'ASHA017',
        name: 'Laxmi Mallick',
        phone: '9876543216',
        area: 'Kendrapara',
        address: 'Village Pattamundai, Block Pattamundai',
        village: 'Pattamundai',
        pinCode: '754215',
        gramPanchayat: 'Pattamundai',
        district: 'Kendrapara',
        block: 'Pattamundai',
        experience: 9,
        languages: ['Odia', 'Hindi']
      },
      
      // Jajpur District - Dharmasala Block
      {
        workerId: 'ASHA018',
        name: 'Bidyutlata Swain',
        phone: '9876543217',
        area: 'Jajpur',
        address: 'Village Dharmasala, Block Dharmasala',
        village: 'Dharmasala',
        pinCode: '755001',
        gramPanchayat: 'Dharmasala',
        district: 'Jajpur',
        block: 'Dharmasala',
        experience: 5,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA019',
        name: 'Pramila Barik',
        phone: '9876543230',
        area: 'Jajpur',
        address: 'Village Jajpur Town, Block Dharmasala',
        village: 'Jajpur Town',
        pinCode: '755007',
        gramPanchayat: 'Jajpur',
        district: 'Jajpur',
        block: 'Dharmasala',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      
      // Mayurbhanj District - Baripada Block
      {
        workerId: 'ASHA020',
        name: 'Manjulata Marandi',
        phone: '9876543231',
        area: 'Baripada',
        address: 'Village Baripada, Block Baripada',
        village: 'Baripada',
        pinCode: '757001',
        gramPanchayat: 'Baripada',
        district: 'Mayurbhanj',
        block: 'Baripada',
        experience: 4,
        languages: ['Odia', 'Santali']
      },
      {
        workerId: 'ASHA036',
        name: 'Basanti Hansdah',
        phone: '9876543255',
        area: 'Baripada',
        address: 'Village Udala, Block Udala',
        village: 'Udala',
        pinCode: '757041',
        gramPanchayat: 'Udala',
        district: 'Mayurbhanj',
        block: 'Udala',
        experience: 5,
        languages: ['Odia', 'Santali']
      },
      {
        workerId: 'ASHA037',
        name: 'Sushma Soren',
        phone: '9876543256',
        area: 'Baripada',
        address: 'Village Rairangpur, Block Rairangpur',
        village: 'Rairangpur',
        pinCode: '757043',
        gramPanchayat: 'Rairangpur',
        district: 'Mayurbhanj',
        block: 'Rairangpur',
        experience: 6,
        languages: ['Odia', 'Santali', 'Hindi']
      },
      
      // Angul District
      {
        workerId: 'ASHA038',
        name: 'Sabitri Nayak',
        phone: '9876543257',
        area: 'Angul',
        address: 'Village Angul, Block Angul',
        village: 'Angul',
        pinCode: '759122',
        gramPanchayat: 'Angul',
        district: 'Angul',
        block: 'Angul',
        experience: 7,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA039',
        name: 'Sasmita Behera',
        phone: '9876543258',
        area: 'Angul',
        address: 'Village Talcher, Block Talcher',
        village: 'Talcher',
        pinCode: '759100',
        gramPanchayat: 'Talcher',
        district: 'Angul',
        block: 'Talcher',
        experience: 5,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA040',
        name: 'Lipsa Pradhan',
        phone: '9876543259',
        area: 'Angul',
        address: 'Village Pallahara, Block Pallahara',
        village: 'Pallahara',
        pinCode: '759118',
        gramPanchayat: 'Pallahara',
        district: 'Angul',
        block: 'Pallahara',
        experience: 4,
        languages: ['Odia', 'Hindi']
      },
      
      // Bhadrak District
      {
        workerId: 'ASHA041',
        name: 'Mamata Parida',
        phone: '9876543260',
        area: 'Bhadrak',
        address: 'Village Bhadrak, Block Bhadrak',
        village: 'Bhadrak',
        pinCode: '756100',
        gramPanchayat: 'Bhadrak',
        district: 'Bhadrak',
        block: 'Bhadrak',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA042',
        name: 'Puspanjali Sahoo',
        phone: '9876543261',
        area: 'Bhadrak',
        address: 'Village Chandbali, Block Chandbali',
        village: 'Chandbali',
        pinCode: '756133',
        gramPanchayat: 'Chandbali',
        district: 'Bhadrak',
        block: 'Chandbali',
        experience: 5,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA043',
        name: 'Rina Biswal',
        phone: '9876543262',
        area: 'Bhadrak',
        address: 'Village Dhamanagar, Block Dhamanagar',
        village: 'Dhamanagar',
        pinCode: '756113',
        gramPanchayat: 'Dhamanagar',
        district: 'Bhadrak',
        block: 'Dhamanagar',
        experience: 7,
        languages: ['Odia', 'Bengali']
      },
      
      // Dhenkanal District
      {
        workerId: 'ASHA044',
        name: 'Sujata Sethy',
        phone: '9876543263',
        area: 'Dhenkanal',
        address: 'Village Dhenkanal, Block Dhenkanal Sadar',
        village: 'Dhenkanal',
        pinCode: '759001',
        gramPanchayat: 'Dhenkanal',
        district: 'Dhenkanal',
        block: 'Dhenkanal Sadar',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA045',
        name: 'Kabita Behera',
        phone: '9876543264',
        area: 'Dhenkanal',
        address: 'Village Kamakshyanagar, Block Kamakshyanagar',
        village: 'Kamakshyanagar',
        pinCode: '759018',
        gramPanchayat: 'Kamakshyanagar',
        district: 'Dhenkanal',
        block: 'Kamakshyanagar',
        experience: 5,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA046',
        name: 'Smitarani Das',
        phone: '9876543265',
        area: 'Dhenkanal',
        address: 'Village Hindol, Block Hindol',
        village: 'Hindol',
        pinCode: '759020',
        gramPanchayat: 'Hindol',
        district: 'Dhenkanal',
        block: 'Hindol',
        experience: 4,
        languages: ['Odia', 'Hindi']
      },
      
      // Jagatsinghpur District
      {
        workerId: 'ASHA047',
        name: 'Gayatri Mallick',
        phone: '9876543266',
        area: 'Jagatsinghpur',
        address: 'Village Jagatsinghpur, Block Jagatsinghpur',
        village: 'Jagatsinghpur',
        pinCode: '754103',
        gramPanchayat: 'Jagatsinghpur',
        district: 'Jagatsinghpur',
        block: 'Jagatsinghpur',
        experience: 7,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA048',
        name: 'Nibedita Swain',
        phone: '9876543267',
        area: 'Jagatsinghpur',
        address: 'Village Paradip, Block Paradip',
        village: 'Paradip',
        pinCode: '754142',
        gramPanchayat: 'Paradip',
        district: 'Jagatsinghpur',
        block: 'Paradip',
        experience: 5,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA049',
        name: 'Sulochana Jena',
        phone: '9876543268',
        area: 'Jagatsinghpur',
        address: 'Village Tirtol, Block Tirtol',
        village: 'Tirtol',
        pinCode: '754137',
        gramPanchayat: 'Tirtol',
        district: 'Jagatsinghpur',
        block: 'Tirtol',
        experience: 6,
        languages: ['Odia']
      },
      
      // Nayagarh District
      {
        workerId: 'ASHA050',
        name: 'Manorama Nayak',
        phone: '9876543269',
        area: 'Nayagarh',
        address: 'Village Nayagarh, Block Nayagarh',
        village: 'Nayagarh',
        pinCode: '752069',
        gramPanchayat: 'Nayagarh',
        district: 'Nayagarh',
        block: 'Nayagarh',
        experience: 5,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA051',
        name: 'Parbati Pradhan',
        phone: '9876543270',
        area: 'Nayagarh',
        address: 'Village Ranpur, Block Ranpur',
        village: 'Ranpur',
        pinCode: '752026',
        gramPanchayat: 'Ranpur',
        district: 'Nayagarh',
        block: 'Ranpur',
        experience: 6,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA052',
        name: 'Saraswati Behera',
        phone: '9876543271',
        area: 'Nayagarh',
        address: 'Village Odagaon, Block Odagaon',
        village: 'Odagaon',
        pinCode: '752081',
        gramPanchayat: 'Odagaon',
        district: 'Nayagarh',
        block: 'Odagaon',
        experience: 4,
        languages: ['Odia', 'Hindi']
      },
      
      // Koraput District
      {
        workerId: 'ASHA053',
        name: 'Sumitra Jani',
        phone: '9876543272',
        area: 'Koraput',
        address: 'Village Koraput, Block Koraput',
        village: 'Koraput',
        pinCode: '764020',
        gramPanchayat: 'Koraput',
        district: 'Koraput',
        block: 'Koraput',
        experience: 5,
        languages: ['Odia', 'Telugu']
      },
      {
        workerId: 'ASHA054',
        name: 'Jamuna Khara',
        phone: '9876543273',
        area: 'Koraput',
        address: 'Village Jeypore, Block Jeypore',
        village: 'Jeypore',
        pinCode: '764001',
        gramPanchayat: 'Jeypore',
        district: 'Koraput',
        block: 'Jeypore',
        experience: 7,
        languages: ['Odia', 'Telugu', 'Hindi']
      },
      {
        workerId: 'ASHA055',
        name: 'Kalpana Gouda',
        phone: '9876543274',
        area: 'Koraput',
        address: 'Village Sunabeda, Block Sunabeda',
        village: 'Sunabeda',
        pinCode: '763002',
        gramPanchayat: 'Sunabeda',
        district: 'Koraput',
        block: 'Sunabeda',
        experience: 4,
        languages: ['Odia']
      },
      
      // Kalahandi District
      {
        workerId: 'ASHA056',
        name: 'Annapurna Majhi',
        phone: '9876543275',
        area: 'Kalahandi',
        address: 'Village Bhawanipatna, Block Bhawanipatna',
        village: 'Bhawanipatna',
        pinCode: '766001',
        gramPanchayat: 'Bhawanipatna',
        district: 'Kalahandi',
        block: 'Bhawanipatna',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA057',
        name: 'Rasmita Sahu',
        phone: '9876543276',
        area: 'Kalahandi',
        address: 'Village Dharamgarh, Block Dharamgarh',
        village: 'Dharamgarh',
        pinCode: '766015',
        gramPanchayat: 'Dharamgarh',
        district: 'Kalahandi',
        block: 'Dharamgarh',
        experience: 5,
        languages: ['Odia']
      },
      
      // Sundargarh District
      {
        workerId: 'ASHA058',
        name: 'Pramila Kerketta',
        phone: '9876543277',
        area: 'Sundargarh',
        address: 'Village Sundargarh, Block Sundargarh',
        village: 'Sundargarh',
        pinCode: '770001',
        gramPanchayat: 'Sundargarh',
        district: 'Sundargarh',
        block: 'Sundargarh',
        experience: 5,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA059',
        name: 'Ranjita Lakra',
        phone: '9876543278',
        area: 'Sundargarh',
        address: 'Village Rourkela, Block Rourkela',
        village: 'Rourkela',
        pinCode: '769001',
        gramPanchayat: 'Rourkela',
        district: 'Sundargarh',
        block: 'Rourkela',
        experience: 6,
        languages: ['Odia', 'Hindi', 'English']
      },
      {
        workerId: 'ASHA060',
        name: 'Sabita Tirkey',
        phone: '9876543279',
        area: 'Sundargarh',
        address: 'Village Panposh, Block Panposh',
        village: 'Panposh',
        pinCode: '769012',
        gramPanchayat: 'Panposh',
        district: 'Sundargarh',
        block: 'Panposh',
        experience: 4,
        languages: ['Odia', 'Hindi']
      },
      
      // Bargarh District
      {
        workerId: 'ASHA061',
        name: 'Renuka Patel',
        phone: '9876543280',
        area: 'Bargarh',
        address: 'Village Bargarh, Block Bargarh',
        village: 'Bargarh',
        pinCode: '768028',
        gramPanchayat: 'Bargarh',
        district: 'Bargarh',
        block: 'Bargarh',
        experience: 7,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA062',
        name: 'Subhasini Meher',
        phone: '9876543281',
        area: 'Bargarh',
        address: 'Village Padampur, Block Padampur',
        village: 'Padampur',
        pinCode: '768036',
        gramPanchayat: 'Padampur',
        district: 'Bargarh',
        block: 'Padampur',
        experience: 5,
        languages: ['Odia']
      },
      {
        workerId: 'ASHA063',
        name: 'Mamata Bag',
        phone: '9876543282',
        area: 'Bargarh',
        address: 'Village Bijepur, Block Bijepur',
        village: 'Bijepur',
        pinCode: '768029',
        gramPanchayat: 'Bijepur',
        district: 'Bargarh',
        block: 'Bijepur',
        experience: 6,
        languages: ['Odia', 'Hindi']
      },
      
      // Bolangir District
      {
        workerId: 'ASHA064',
        name: 'Gitanjali Sahu',
        phone: '9876543283',
        area: 'Bolangir',
        address: 'Village Bolangir, Block Bolangir',
        village: 'Bolangir',
        pinCode: '767001',
        gramPanchayat: 'Bolangir',
        district: 'Bolangir',
        block: 'Bolangir',
        experience: 5,
        languages: ['Odia', 'Hindi']
      },
      {
        workerId: 'ASHA065',
        name: 'Sarojini Bhoi',
        phone: '9876543284',
        area: 'Bolangir',
        address: 'Village Patnagarh, Block Patnagarh',
        village: 'Patnagarh',
        pinCode: '767025',
        gramPanchayat: 'Patnagarh',
        district: 'Bolangir',
        block: 'Patnagarh',
        experience: 6,
        languages: ['Odia']
      },
      
      // Rayagada District
      {
        workerId: 'ASHA066',
        name: 'Sukanti Bisoi',
        phone: '9876543285',
        area: 'Rayagada',
        address: 'Village Rayagada, Block Rayagada',
        village: 'Rayagada',
        pinCode: '765001',
        gramPanchayat: 'Rayagada',
        district: 'Rayagada',
        block: 'Rayagada',
        experience: 4,
        languages: ['Odia', 'Telugu']
      },
      {
        workerId: 'ASHA067',
        name: 'Laxmi Hikaka',
        phone: '9876543286',
        area: 'Rayagada',
        address: 'Village Gunupur, Block Gunupur',
        village: 'Gunupur',
        pinCode: '765022',
        gramPanchayat: 'Gunupur',
        district: 'Rayagada',
        block: 'Gunupur',
        experience: 5,
        languages: ['Odia', 'Telugu', 'Hindi']
      }
    ];

    // Insert ASHA workers
    const insertedWorkers = await Asha.insertMany(ashaWorkers);
    console.log(`✅ Successfully created ${insertedWorkers.length} ASHA workers`);

    console.log('\n🎉 Database seeding completed!');
    console.log('\n📊 Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total ASHA workers: ${insertedWorkers.length}`);
    
    // Count by district
    const districtCounts = {};
    ashaWorkers.forEach(worker => {
      districtCounts[worker.district] = (districtCounts[worker.district] || 0) + 1;
    });
    
    console.log('\nASHAs by District:');
    Object.entries(districtCounts).forEach(([district, count]) => {
      console.log(`  ${district}: ${count} ASHAs`);
    });
    
    console.log('\n📝 Sample ASHA Workers:');
    ashaWorkers.slice(0, 5).forEach((worker, index) => {
      console.log(`\n${index + 1}. ${worker.name}`);
      console.log(`   Location: ${worker.village}, ${worker.block}, ${worker.district}`);
      console.log(`   PIN: ${worker.pinCode} | Phone: ${worker.phone}`);
    });
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedAshaWorkers();
