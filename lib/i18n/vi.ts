// Vietnamese message dictionary. Written to read like a native wrote it —
// confident, trustworthy, plain — not a literal machine translation. Terms of art:
// hackathon (kept), đơn vị tổ chức (organizer), nhà tài trợ (sponsor),
// giải thưởng (prize), đánh giá (review), đã xác minh (verified).
//
// Parity with en.ts is enforced by `dictionaries: Record<Locale, Messages>` in
// index.ts — any missing/mismatched key fails the build.

export const vi = {
  languageName: "Tiếng Việt",

  nav: {
    ariaPrimary: "Điều hướng chính",
    directory: "Danh bạ",
    addEntry: "Thêm mục",
    howItWorks: "Cách hoạt động",
    trust: "Tin cậy & An toàn",
    writeReview: "Viết đánh giá",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    languageGroup: "Ngôn ngữ",
    switchToEnglish: "Chuyển sang tiếng Anh",
    switchToVietnamese: "Chuyển sang tiếng Việt",
  },

  brand: {
    tagline: "Hồ sơ cộng đồng về các đơn vị tổ chức hackathon.",
    pitch:
      "Đánh giá đã xác minh, từ chính người trong cuộc, về các công ty, đơn vị tổ chức và nhà tài trợ đứng sau mỗi hackathon — để bạn biết ai trả giải sòng phẳng, chấm công bằng và giữ đúng lời hứa, trước khi bạn dốc cả một cuối tuần.",
    posture:
      "Chúng tôi đăng tải những gì người tham gia đã xác minh phản ánh. Chúng tôi không tự chấm điểm hay quy kết bất kỳ ai — mọi con số trên trang này chỉ là thống kê lại lời của những người thực sự có mặt.",
    region: "Việt Nam & Đông Nam Á",
  },

  common: {
    of: "trên",
    review: "đánh giá",
    reviews: "đánh giá",
    noReviewsYet: "Chưa có đánh giá",
    writeReview: "Viết đánh giá",
    browseDirectory: "Xem toàn bộ danh bạ",
    seeAllN: (n: number) => `Xem tất cả ${n} →`,
    reviewCount: (n: number) => `${n} đánh giá`,
    reviewsWithCount: (n: number) => `Đánh giá (${n})`,
  },

  home: {
    heroBadge: "Việt Nam & Đông Nam Á",
    heroTitleLead: "Buộc hackathon phải ",
    heroTitleAccent: "sòng phẳng.",
    searchAria: "Tìm đơn vị tổ chức, nhà tài trợ hoặc sự kiện",
    searchPlaceholder: "Tìm đơn vị tổ chức, nhà tài trợ hoặc sự kiện…",
    searchButton: "Tìm kiếm",
    writeReview: "Viết đánh giá",
    statOrganizers: "đơn vị tổ chức được ghi nhận",
    statVerifiedReviews: "đánh giá đã xác minh",
    statEvents: "sự kiện được theo dõi",

    onTheRecord: "Đã ghi nhận",
    featuredProblemsLabel: "Đề bài",
    featuredProblemsSub: "mỗi đề là một bài toán vận hành có thật của nhà tài trợ",
    featuredAdvertisedLabel: "Quảng cáo",
    featuredAdvertisedValue: "Ưu đãi $1M+",
    featuredAdvertisedSub: "phần lớn là chương trình bên thứ ba & gói miễn phí",
    featuredReportedLabel: "Đã phản ánh",
    featuredReportedValue: "Không nhận được credit",
    featuredReportedSub: "đã đăng ký qua cổng, nhận về $0",
    seeFullRecord: "Xem toàn bộ hồ sơ",
    communityRecord: "Hồ sơ cộng đồng",

    howItWorksTitle: "Cách hoạt động",
    step1Title: "Tìm đơn vị tổ chức",
    step1Body:
      "Uy tín đi theo đơn vị qua từng sự kiện, không chỉ gói gọn trong một cuối tuần.",
    step2Title: "Đọc hồ sơ",
    step2Body:
      "Bản thống kê trung lập về những gì người tham gia đã xác minh thực sự phản ánh.",
    step3Title: "Thêm đánh giá của bạn",
    step3Body: "Từng tham gia? Đăng một đánh giá đã xác minh. Bạn vẫn ẩn danh.",
    howItWorksLink: "Cách hoạt động",

    organizersOnRecord: "Đơn vị tổ chức được ghi nhận",
    howWeKeepItHonest: "Cách chúng tôi giữ sự trung thực",
  },

  howItWorks: {
    metaTitle: "Cách hoạt động",
    metaDescription:
      "Kiểm tra một đơn vị tổ chức trước khi bạn bỏ ra cả một cuối tuần, và thêm đánh giá đã xác minh của riêng bạn.",
    eyebrow: "Cách hoạt động",
    title: "Biết rõ bạn đang bỏ công cho ai",
    intro: (brandName: string) =>
      `Một cuối tuần lao động là công sức thật. ${brandName} là hồ sơ bền vững của cộng đồng về những đơn vị tổ chức hackathon giữ lời, để tín hiệu ấy không trôi tuột trong một kênh Discord chỉ sau vài ngày.`,
    steps: [
      {
        title: "Tìm đơn vị tổ chức",
        body: "Tra cứu công ty, đơn vị tổ chức hoặc nhà tài trợ đứng sau một sự kiện. Uy tín đi theo đơn vị qua các sự kiện, bởi cùng một nhóm người thường tổ chức lại hackathon dưới những cái tên mới.",
      },
      {
        title: "Đọc hồ sơ",
        body: "Xem bản tóm tắt trung lập về những gì người tham gia đã xác minh phản ánh: giải thưởng có được trả không, ưu đãi quảng cáo có thật không, chấm giải có công bằng không, thực tế có khớp với quảng bá không?",
      },
      {
        title: "Thêm đánh giá của bạn",
        body: "Từng tham gia? Hãy viết một đánh giá đã xác minh, từ góc nhìn người trong cuộc. Nêu sự thật, đính kèm bằng chứng cho mọi tuyên bố quan trọng. Bạn vẫn ẩn danh; thông tin định danh của bạn được lưu tách biệt và không bao giờ hiển thị.",
      },
      {
        title: "Đơn vị tổ chức phản hồi",
        body: "Đơn vị tổ chức có thể nhận trang của mình và phản hồi công khai. Người làm tốt có cơ hội chứng minh họ đã sửa sai; hồ sơ vẫn còn đó cho tất cả mọi người.",
      },
    ],
    ctaDirectory: "Xem danh bạ",
    ctaReview: "Viết đánh giá",
  },

  trust: {
    metaTitle: "Tin cậy & An toàn",
    metaDescription:
      "Cách thức xác minh, ẩn danh, kiểm duyệt và quyền phản hồi hoạt động trên HackHonest.",
    eyebrow: "Tin cậy & An toàn",
    title: "Điều gì giữ cho nơi này trung thực",
    sections: {
      host: {
        title: "Chúng tôi đăng tải, không phán xét",
        body: (brandName: string) =>
          `${brandName} là nơi đăng tải trung lập những gì người tham gia đã xác minh phản ánh. Chúng tôi không viết đánh giá, và không tự chấm điểm hay quy kết bất kỳ ai. Mọi con số bạn thấy chỉ là thống kê thuần túy lời của những người thực sự có mặt, ví dụ "3 trên 4 người đánh giá đã xác minh cho biết giải thưởng không được trả đúng cam kết." Kết luận là do bạn tự rút ra.`,
      },
      verified: {
        title: "Chỉ nhận đánh giá đã xác minh, từ người trong cuộc",
        body: "Đánh giá đến từ những người thực sự đã tham gia. Chúng tôi xác minh việc tham gia trước khi đăng, dựa trên những dấu hiệu mà người đánh giá có thể chứng minh mình sở hữu: một tài khoản GitHub gắn với repo dự án của sự kiện, một email xác nhận từ chính tên miền của sự kiện, hoặc bằng chứng tài liệu như email chấp nhận hay ảnh chụp bảng điều khiển. Chúng tôi không nhận đánh giá nghe lại hay giả định.",
      },
      anonymous: {
        title: "Đã xác minh, nhưng vẫn ẩn danh",
        body: "Người đánh giá đăng dưới một biệt danh. Thông tin định danh chúng tôi dùng để xác minh bạn được lưu tách biệt khỏi bài đánh giá và không bao giờ hiển thị công khai, để đơn vị tổ chức không thể trả đũa bạn vì một lời nói thật. Chúng tôi giữ càng ít dữ liệu càng tốt.",
      },
      facts: {
        title: "Sự thật thay vì lời lẽ công kích",
        body: "Biểu mẫu đánh giá được thiết kế để ghi lại điều đã xảy ra, không phải để mạt sát. Hãy nêu sự thật trước, rồi đến quan điểm của bạn. Đính kèm bằng chứng cho mọi tuyên bố quan trọng (một giải thưởng đã hứa, một khoản credit không được cấp). Một tường thuật có dẫn chứng, từ người trong cuộc, vừa hữu ích hơn cho người đến sau, vừa vững vàng hơn nhiều so với một bài chửi bới.",
      },
      reply: {
        title: "Quyền phản hồi, dành cho đơn vị tổ chức",
        body: "Bất kỳ đơn vị tổ chức nào cũng có thể nhận trang của mình và đăng phản hồi công khai cho mọi đánh giá. Họ có tiếng nói cuối cùng, nhưng không thể xóa một đánh giá chỉ vì họ không đồng tình. Chúng tôi chỉ gỡ nội dung khi vi phạm rõ ràng chính sách (lộ thông tin cá nhân, lạc đề, vi phạm pháp luật, hoặc đánh giá từ người không tham gia), không bao giờ vì một doanh nghiệp yêu cầu gỡ lời phê bình trung thực.",
      },
      report: {
        title: "Báo cáo vấn đề",
        body: "Phát hiện một đánh giá giả, một đánh giá từ người không tham gia, hay nội dung cần được gỡ? Hãy báo cáo và chúng tôi sẽ xem xét. Lạm dụng công cụ báo cáo tự nó cũng là một vi phạm.",
      },
    },
    footnote: (region: string) =>
      `Đây là một dự án cộng đồng tại ${region}. Đây không phải tư vấn pháp lý, và một trang tại đây không phải trang chính thức của đơn vị tổ chức.`,
  },

  about: {
    metaTitle: "Giới thiệu",
    metaDescription:
      "Vì sao cần một hồ sơ cộng đồng về các đơn vị tổ chức hackathon, và nó dành cho ai.",
    eyebrow: "Giới thiệu",
    title: "Vì sao có nơi này",
    p1: 'AI khiến ai cũng có thể xây dựng sản phẩm thật nhanh, nên hackathon bùng nổ. Kèm theo đó là một làn sóng lạm dụng: các công ty tổ chức "hackathon" mà đề bài chính là những bài toán kinh doanh thật, đã được đặc tả sẵn của họ, rồi đem giải pháp thắng cuộc đi triển khai thay vì trả tiền cho một đội ngũ phát triển. Đơn vị tổ chức hứa hẹn quá đà về credit, giải thưởng và ưu đãi rồi chẳng bao giờ giao. Những lập trình viên trẻ, đầy nhiệt huyết đem cho không cả một cuối tuần lao động thật chỉ để đổi lấy một lời hứa.',
    p2: (brandName: string) =>
      `Đến nay, chẳng chuyện nào trong số đó để lại một dấu vết tìm kiếm được. Một trải nghiệm tồi chết dần trong một dòng tweet bực dọc, một kênh Discord của sự kiện, hay một nhóm chat, và lứa tiếp theo bước vào trong mù mịt. ${brandName} là lời giải: một hồ sơ công khai, bền vững về những đơn vị tổ chức, công ty và nhà tài trợ giữ lời, dựng nên từ lời kể của chính những người đã thực sự có mặt.`,
    p3: "Nó cân bằng ngay từ trong thiết kế. Khen những sự kiện tốt để nhiều người tham gia hơn; ghi lại những sự kiện tệ để ít người bị hớ hơn. Nền tảng không bao giờ quy kết bất kỳ ai, nó chỉ cho thấy những gì người tham gia đã xác minh phản ánh, rồi để bạn tự quyết.",
    p4: (region: string) =>
      `Đây là một dự án cộng đồng, khởi đầu tại ${region}, nơi nhu cầu đang bức thiết nhất lúc này. Nền tảng chỉ là công cụ. Hồ sơ thuộc về cộng đồng cùng nhau xây nên nó.`,
  },

  tos: {
    metaTitle: "Điều khoản & chính sách nội dung",
    metaDescription: "Quy tắc khi đăng bài, và cách nội dung được xử lý.",
    eyebrow: "Điều khoản & chính sách nội dung",
    title: "Quy tắc, nói thẳng và dễ hiểu",
    intro: (brandName: string) =>
      `${brandName} là nơi đăng tải trung lập các đánh giá của người dùng. Đây là những quy tắc nền tảng; bản pháp lý đầy đủ sẽ đi kèm khi ra mắt công khai.`,
    rules: [
      {
        h: "Bạn là tác giả",
        p: "Bạn, người đánh giá, là tác giả và chủ sở hữu duy nhất của bài đánh giá. Nền tảng chỉ đăng tải nó; nền tảng không nhận nó làm của mình, cũng không viết thay bạn.",
      },
      {
        h: "Người trong cuộc và đúng sự thật",
        p: "Chỉ đăng về những sự kiện bạn đích thân tham gia. Cam kết rằng những gì bạn viết là đúng với trải nghiệm của chính bạn, và rằng bạn có đủ quyền cùng sự đồng ý cho mọi bằng chứng bạn tải lên.",
      },
      {
        h: "Quan điểm và sự thật đã công khai",
        p: "Nêu những sự thật bạn dựa vào, rồi đến quan điểm của bạn. Một kết luận rút ra từ những sự thật bạn đã công khai là quan điểm được bảo vệ của bạn. Đừng khẳng định như sự thật những điều bạn không thể chứng minh.",
      },
      {
        h: "Không bịa đặt",
        p: "Không đánh giá giả, theo cả hai chiều. Không tự đánh giá sự kiện của mình, và không mua bán hay ép buộc đánh giá. Đây là quy tắc bất di bất dịch.",
      },
      {
        h: "Bảo vệ người khác",
        p: "Che đi tên, khuôn mặt, email và số điện thoại của bên thứ ba trong mọi bằng chứng. Đừng đăng thông tin riêng tư của người khác.",
      },
      {
        h: "Quyền phản hồi, không phải quyền xóa",
        p: "Đơn vị tổ chức bị đánh giá có thể nhận trang của mình và phản hồi công khai, nhưng không thể xóa lời phê bình trung thực. Nội dung chỉ bị gỡ khi vi phạm rõ ràng chính sách.",
      },
      {
        h: "Báo cáo và gỡ bỏ",
        p: "Báo cáo đánh giá giả, đánh giá từ người không tham gia, hành vi lộ thông tin cá nhân, hay nội dung vi phạm pháp luật và chúng tôi sẽ xem xét. Chúng tôi tôn trọng các yêu cầu pháp lý hợp lệ và thông báo cho người đánh giá bị ảnh hưởng khi có thể.",
      },
    ],
    footnote: (region: string) =>
      `Đây là một dự án cộng đồng tại ${region} và không phải tư vấn pháp lý. Một trang tại đây không phải trang chính thức của đơn vị tổ chức.`,
  },

  directory: {
    metaTitle: "Danh bạ",
    metaDescription:
      "Duyệt và tìm kiếm các đơn vị tổ chức, công ty và nhà tài trợ hackathon, cùng những gì người tham gia đã xác minh phản ánh.",
    title: "Danh bạ",
    subtitle:
      "Tìm các công ty, đơn vị tổ chức và nhà tài trợ đứng sau những sự kiện hackathon.",
    searchAria: "Tìm đơn vị tổ chức, nhà tài trợ, công ty và sự kiện",
    searchPlaceholder: "Tìm đơn vị tổ chức, nhà tài trợ, sự kiện…",
    clearSearch: "Xóa tìm kiếm",
    filterGroupAria: "Lọc danh bạ theo danh mục",
    tabAll: "Tất cả",
    tabOrganizers: "Đơn vị tổ chức",
    tabEvents: "Sự kiện",
    tabCompanies: "Công ty",
    tabSponsors: "Nhà tài trợ",
    noMatches: (q: string) => `Không có kết quả cho "${q}".`,
    addFirstReviewArrow: "Thêm đánh giá đầu tiên →",
    addToDirectoryArrow: "Thêm vào danh bạ →",
    nothingHereYet: "Chưa có gì ở đây.",
    addFirstReview: "Thêm đánh giá đầu tiên",
    alsoKnownAs: (list: string) => `Còn được biết đến là ${list}`,
    claimed: "Đã nhận trang",
  },

  reviewNew: {
    metaTitle: "Viết đánh giá",
    metaDescription:
      "Thêm đánh giá đã xác minh, từ người trong cuộc, về một đơn vị tổ chức hoặc sự kiện hackathon.",
    eyebrow: "Viết đánh giá",
    title: "Kể lại điều đã thực sự xảy ra",
    intro: (posture: string) =>
      `Chỉ đánh giá những sự kiện bạn đã tham gia. Bạn vẫn ẩn danh, và chúng tôi xác minh việc tham gia trước khi bất cứ điều gì được đăng. ${posture}`,
  },

  reviewForm: {
    errChooseTarget: "Vui lòng chọn đối tượng bạn muốn đánh giá.",
    errOverall: "Vui lòng cho điểm đánh giá tổng thể.",
    errHeadline: "Vui lòng viết một tiêu đề ngắn (ít nhất 6 ký tự).",
    errBody: "Vui lòng mô tả điều đã xảy ra (ít nhất 40 ký tự).",
    errGeneric: "Đã có lỗi xảy ra. Vui lòng thử lại.",
    errNetwork: "Lỗi kết nối. Vui lòng thử lại.",
    successBody: "Đánh giá của bạn đã được ghi nhận và đang chờ xác minh.",
    successHeading: "Cảm ơn bạn",
    successNote:
      "Chúng tôi xác minh rằng người đánh giá thực sự đã tham gia trước khi bất cứ điều gì được đăng. Danh tính của bạn được lưu tách biệt khỏi bài đánh giá và không bao giờ hiển thị.",

    targetLabel: "Bạn đang đánh giá điều gì?",
    targetPlaceholder: "Chọn một đơn vị tổ chức hoặc sự kiện…",
    optgroupEvents: "Sự kiện",
    optgroupOrganizers: "Đơn vị tổ chức",

    overallLabel: "Điểm tổng thể",

    dimensionsLabel: "Chấm điểm những gì thực sự đã xảy ra",
    dimensionsHelp: "Bỏ qua mục nào không áp dụng.",

    headlineLabel: "Tiêu đề",
    headlinePlaceholder: "Một dòng: người đến sau cần biết điều gì?",

    bodyLabel: "Chuyện gì đã xảy ra?",
    bodyHelp:
      "Nêu sự thật trước, rồi đến quan điểm của bạn. Đính kèm bằng chứng cho mọi tuyên bố quan trọng (một giải thưởng đã hứa, một khoản credit không được cấp).",
    bodyPlaceholder:
      "Tôi đã tham gia [sự kiện]. Họ hứa… Tôi nhận được… Đây là những gì tôi có thể chứng minh…",

    proofLabel: "Bạn chứng minh mình đã tham gia bằng cách nào?",
    proofHelp:
      "Chỉ dùng để xác minh — không bao giờ đăng công khai. Ví dụ: link dự án trên Devpost, email xác nhận, tài khoản Discord hoặc một tấm ảnh.",
    proofPlaceholder: "Link hoặc mô tả bằng chứng tham gia của bạn",

    authorLabel: "Tên hiển thị (không bắt buộc)",
    authorHelp:
      "Một biệt danh hiển thị cùng bài đánh giá của bạn. Để trống để đăng ẩn danh.",
    authorPlaceholder: "ví dụ: Người tham gia đã xác minh",

    contactLabel: "Liên hệ riêng tư (không bắt buộc)",
    contactHelp: "Chỉ dùng để xác minh. Không hiển thị, không chia sẻ.",
    contactPlaceholder: "email hoặc tài khoản",

    submit: "Gửi để xác minh",
    submitting: "Đang gửi…",
    submitNote: "Đánh giá được kiểm tra trước khi đăng.",
  },

  suggest: {
    metaTitle: "Đề xuất một mục",
    metaDescription:
      "Dán liên kết của một sự kiện hoặc đơn vị tổ chức, AI sẽ giúp bạn thêm vào danh bạ. Bạn xem lại và xác nhận mọi thứ trước khi gửi.",
    navLink: "Thêm sự kiện hoặc đơn vị tổ chức",
    eyebrow: "Đề xuất một mục",
    title: "Thêm sự kiện hoặc đơn vị tổ chức",
    intro:
      "Dán liên kết tới một hackathon, đơn vị tổ chức hoặc nhà tài trợ. AI đọc trang, điền sẵn thông tin và kiểm tra danh bạ xem có bị trùng không. Bạn xem lại và chỉnh sửa mọi thứ trước khi nó vào hàng chờ kiểm duyệt — không có gì được đăng tự động.",
    urlLabel: "Liên kết sự kiện hoặc đơn vị tổ chức",
    urlPlaceholder: "https://…",
    urlHelp: "Liên kết tới trang sự kiện, trang của đơn vị tổ chức hoặc trang nhà tài trợ.",
    analyze: "Phân tích bằng AI",
    analyzing: "Đang phân tích…",
    fillManually: "Hoặc tự điền biểu mẫu",
    errUrlRequired: "Vui lòng dán một liên kết trước.",
    errUrlInvalid: "Vui lòng nhập một liên kết http(s) hợp lệ.",
    aiDisabledNote:
      "Tính năng phân tích bằng AI chưa được cấu hình — hãy tự điền biểu mẫu bên dưới. Mục của bạn vẫn được đưa vào hàng chờ kiểm duyệt.",
    analysisFailedNote:
      "Chúng tôi không thể tự động phân tích liên kết đó. Hãy tự điền biểu mẫu bên dưới.",
    prefilledNote:
      "AI đã điền sẵn thông tin từ liên kết. Hãy kiểm tra từng trường và sửa những gì chưa đúng trước khi gửi.",
  },

  suggestForm: {
    duplicatesTitle: "Mục này có thể đã có trong danh bạ",
    duplicatePrefix: "Trông giống như",
    duplicateSuffix: "— một mục có thể đã tồn tại.",
    duplicatesHelp:
      "Nếu mục của bạn là một trong số này, hãy thêm đánh giá ở đó thay vì tạo một mục trùng lặp.",
    typeLabel: "Loại mục",
    typeOrganizer: "Đơn vị tổ chức",
    typeEvent: "Sự kiện",
    typeCompany: "Công ty",
    typeSponsor: "Nhà tài trợ",
    nameLabel: "Tên",
    namePlaceholder: "Ví dụ: Zenith AI Ventures",
    websiteLabel: "Website",
    websitePlaceholder: "https://…",
    locationLabel: "Địa điểm",
    locationPlaceholder: "Ví dụ: Thành phố Hồ Chí Minh, Việt Nam",
    datesLabel: "Thời gian",
    datesHelp: "Chỉ dành cho sự kiện.",
    datesPlaceholder: "Ví dụ: 20–24 tháng 8, 2026",
    blurbLabel: "Mô tả",
    blurbHelp: "Một hoặc hai câu trung lập, đúng sự thật — không buộc tội, chỉ nêu rõ đây là gì.",
    blurbPlaceholder: "Đây là sự kiện hay đơn vị tổ chức nào? Hãy trình bày đúng sự thật.",
    sponsorsLabel: "Nhà tài trợ phát hiện được",
    sponsorsHelp: "Ngăn cách bằng dấu phẩy. Chỉnh sửa hoặc xóa nếu cần.",
    sponsorsPlaceholder: "Ví dụ: Crestline Bank, SwiftCart",
    submittedByLabel: "Tên hoặc tài khoản của bạn (không bắt buộc)",
    submittedByHelp: "Để chúng tôi ghi nhận hoặc liên hệ lại. Thông tin này sẽ không bao giờ được hiển thị công khai.",
    submittedByPlaceholder: "Ví dụ: tài khoản Devpost hoặc email",
    errName: "Vui lòng nhập tên (ít nhất 2 ký tự).",
    errType: "Vui lòng chọn loại mục.",
    errWebsite: "Website phải là liên kết http(s) hợp lệ.",
    errGeneric: "Đã xảy ra sự cố. Vui lòng thử lại.",
    errNetwork: "Lỗi kết nối mạng. Vui lòng thử lại.",
    submit: "Gửi để duyệt",
    submitting: "Đang gửi…",
    submitNote: "Mọi đề xuất đều được kiểm tra thủ công trước khi được thêm vào.",
    successHeading: "Cảm ơn bạn",
    successBody: "Đề xuất của bạn đã được ghi nhận và đang chờ duyệt.",
    successNote:
      "Chúng tôi kiểm tra từng đề xuất trước khi thêm vào danh bạ. Không có nội dung nào được đăng tự động.",
    startOver: "Đề xuất mục khác",
  },

  ratingBand: {
    good: "Được đánh giá tốt",
    mixed: "Đánh giá trái chiều",
    poor: "Bị đánh giá kém",
  },

  verified: {
    attendee: "Người tham gia đã xác minh",
    methods: {
      "founder-attested": {
        label: "Nhà sáng lập xác nhận",
        detail: "Một nhà sáng lập có tên đã xác nhận người đánh giá này từng tham gia.",
      },
      github: {
        label: "Xác minh qua GitHub",
        detail: "Liên kết với tài khoản GitHub có bài dự thi trùng khớp.",
      },
      evidence: {
        label: "Có bằng chứng",
        detail: "Người đánh giá đã cung cấp ảnh chụp màn hình hoặc tài liệu hỗ trợ.",
      },
      "email-dkim": {
        label: "Xác minh qua email",
        detail: "Xác nhận qua email có chữ ký (DKIM) từ sự kiện.",
      },
    },
  },

  aggregate: {
    defaultTitle: "Hồ sơ cộng đồng",
    ariaRecord: (title: string) => `${title}: hồ sơ cộng đồng`,
    basedOnPrefix: "Dựa trên",
    verifiedSuffix: "đã xác minh",
    noReviewsCta:
      "Chưa có đánh giá. Hãy là người tham dự đã xác minh đầu tiên chia sẻ những gì đã xảy ra.",
    noRatingsYet: "Chưa có đánh giá",
    dimAriaNone: (label: string) => `${label}: chưa có đánh giá`,
    dimAriaValue: (label: string, avg: string, count: number) =>
      `${label}: ${avg} trên 5 từ ${count} người đánh giá`,
    whatReported: "Những gì người đánh giá đã xác minh phản ánh",
    reviewersReported: "người đánh giá đã xác minh cho biết",
    ratedLow: (dimLabel: string) => `đã đánh giá "${dimLabel}" từ 2 sao trở xuống`,
    postureNote: (brandName: string) =>
      `Đây là thống kê những gì người tham dự đã xác minh phản ánh — không phải đánh giá do ${brandName} đưa ra.`,
  },

  actorKinds: {
    organizer: "Đơn vị tổ chức",
    company: "Công ty",
    sponsor: "Nhà tài trợ",
    event: "Sự kiện",
  },

  reviewCard: {
    evidenceProvided: "Bằng chứng đã cung cấp",
    evidenceKinds: {
      screenshot: "Ảnh chụp màn hình",
      email: "Email",
      link: "Liên kết",
    },
    evidenceTitle: (kind: string) => `Bằng chứng ${kind}`,
    byline: "· ẩn danh, danh tính được giữ kín",
    responseFrom: (author: string) => `Phản hồi từ ${author}`,
    organizerReply: "Phản hồi của đơn vị tổ chức",
  },

  organizerPage: {
    metaTitleFallback: "Đơn vị tổ chức",
    metaTitle: (name: string) => `${name} — đánh giá & hồ sơ hackathon`,
    metaDescription: (name: string, blurb: string) =>
      `${name} có phải là một đơn vị tổ chức/nhà tài trợ hackathon tốt? Những gì người tham dự đã xác minh phản ánh: ${blurb}`,
    crumbOrganizer: "Đơn vị tổ chức",
    crumbSponsor: "Nhà tài trợ",
    alsoSeenAs: (list: string) => `Còn thấy dưới tên: ${list}`,
    writeReview: "Viết đánh giá",
    claimPage: "Nhận trang này",
    claimTooltip: "Quyền phản hồi — sẽ có khi ra mắt công khai",
    aggregateTitle: "Những gì người đánh giá đã xác minh phản ánh",
    eventsHeading: "Sự kiện",
    roleOrganized: "Đứng ra tổ chức",
    roleSponsored: "Tài trợ",
    noReviews: "Chưa có đánh giá.",
    beFirst: "Hãy là người đầu tiên đánh giá",
  },

  eventPage: {
    metaTitleFallback: "Sự kiện",
    metaTitle: (name: string) => `${name} — đánh giá & hồ sơ`,
    metaDescription: (name: string, dates: string, location: string) =>
      `Những gì người tham gia đã xác minh phản ánh về ${name} (${dates}, ${location}): giải thưởng, ưu đãi, chấm giải và cấu trúc bài toán của nhà tài trợ.`,
    crumbEvent: "Sự kiện",
    organizedBy: "tổ chức bởi",
    howItWorked: "Cách vận hành: ",
    writeReview: "Viết đánh giá",
    aggregateTitle: "Những gì người tham gia đã xác minh phản ánh",
    advertisedHeading: "Những gì đã được quảng cáo",
    perksHeading:
      "Ưu đãi & credit được quảng cáo so với những gì một người tham gia đã xác minh phản ánh",
    perksColProvider: "Nhà cung cấp",
    perksColAdvertised: "Được quảng cáo",
    perksColReported: "Thực tế",
    tracksHeading: "Hạng mục & đề bài",
    tracksSubtitle: (problems: number, tracks: number) =>
      `${problems} đề bài trải trên ${tracks} hạng mục, mỗi hạng mục do một doanh nghiệp có tên sở hữu. Mọi bài dự thi đều phải giải một trong số này.`,
    problemsBadge: (n: number) => `${n} đề bài`,
    sponsoredBy: "Tài trợ bởi",
    winnersHeading: "Các đội vào vòng cuối & đội thắng cuộc",
    winnersSubtitleMapped: (count: number) =>
      `Theo công bố của đơn vị tổ chức. Cả ${count} dự án được ghi nhận đều được xây dựng để giải một bài toán vận hành của một nhà tài trợ có tên.`,
    winnersSubtitlePlain: "Theo công bố của đơn vị tổ chức.",
    forSponsor: (name: string) => `cho ${name}`,
    factsHeading: "Đã ghi nhận",
    factsSubtitle:
      "Những sự thật có nguồn về sự kiện này. Chúng tôi nêu ra; chúng tôi không diễn giải.",
    source: (src: string) => `Nguồn: ${src}`,
    problemsHeading: (n: number) => `Toàn bộ ${n} đề bài`,
    problemsSubtitle:
      "Mỗi đề là một bài toán vận hành có thật của một doanh nghiệp có tên.",
    noReviews: "Chưa có đánh giá. Bạn đã tham dự chứ?",
    beFirst: "Hãy là người đầu tiên đánh giá",
    sponsorsOnRecord: (list: string) => `Nhà tài trợ được ghi nhận: ${list}.`,
  },

  perkStatus: {
    not_received: "Chưa nhận được",
    third_party_program: "Chương trình bên thứ ba",
    out_of_stock: "Đã hết",
    delivered: "Đã cấp",
    unknown: "Chưa xác minh",
  },

  placement: {
    Winner: "Thắng cuộc",
    "Runner-up": "Á quân",
    Shortlist: "Vào vòng cuối",
  },

  reviewDimensions: {
    prizes: {
      label: "Giải thưởng được trao đúng cam kết",
      help: "Giải thưởng đã quảng cáo có được trao đủ và đúng hạn không?",
    },
    perks: {
      label: "Ưu đãi & credit là thật",
      help: "Các credit/ưu đãi được liệt kê có thực sự do đơn vị tổ chức cung cấp, hay chỉ là chương trình của bên thứ ba được 'khoác áo mới'?",
    },
    judging: {
      label: "Chấm giải công bằng & minh bạch",
      help: "Tiêu chí rõ ràng, không xung đột lợi ích và kết quả được giải thích?",
    },
    organization: {
      label: "Tổ chức chuyên nghiệp",
      help: "Địa điểm, lịch trình, truyền thông và hỗ trợ?",
    },
    honesty: {
      label: "Quảng bá trung thực",
      help: "Thực tế có khớp với những gì đã quảng cáo không?",
    },
    respect: {
      label: "Tôn trọng công sức người tham gia",
      help: "Đối xử công bằng với thời gian, quyền sở hữu trí tuệ và công sức của bạn?",
    },
  },

  starRating: {
    ratingWithMax: (max: number) => `Đánh giá, ${max} sao`,
    starOfMax: (i: number, max: number) => `${i} trên ${max} sao`,
    valueOutOfMax: (value: string, max: number) => `${value} trên ${max} sao`,
  },

  footer: {
    explore: "Khám phá",
    trust: "Tin cậy",
    disclaimer: (brandName: string) =>
      `Đây không phải trang chính thức của đơn vị tổ chức. ${brandName} đăng tải các đánh giá độc lập, từ người tham gia đã được xác minh. Mọi con số trên trang này đều là thống kê những gì người tham dự thực sự phản ánh.`,
    copyright: (year: number, brandName: string) => `© ${year} ${brandName}`,
  },
};
