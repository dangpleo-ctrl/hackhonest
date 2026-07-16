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
    ariaPrimary: "Chính",
    directory: "Danh bạ",
    addEntry: "Thêm mục",
    howItWorks: "Cách hoạt động",
    trust: "Tin cậy & an toàn",
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
      "Những đánh giá đã xác minh, từ chính người tham dự, về các công ty, đơn vị tổ chức và nhà tài trợ đứng sau các cuộc hackathon — để bạn biết rõ ai thật sự trả giải, chấm công bằng và giữ lời hứa trước khi dành cả cuối tuần.",
    posture:
      "Chúng tôi chỉ đăng những gì người tham dự đã xác minh báo cáo. Chúng tôi không tự đánh giá hay buộc tội ai — mọi con số trên trang này đều là tổng hợp từ phản hồi thực tế của người tham dự.",
    region: "Việt Nam & Đông Nam Á",
  },

  common: {
    of: "trong",
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
    heroTitleLead: "Giữ hackathon",
    heroTitleAccent: "chịu trách nhiệm.",
    searchAria: "Tìm đơn vị tổ chức, nhà tài trợ hoặc sự kiện",
    searchPlaceholder: "Tìm đơn vị tổ chức, nhà tài trợ hoặc sự kiện…",
    searchButton: "Tìm",
    writeReview: "Viết đánh giá",
    statOrganizers: "đơn vị tổ chức đã ghi nhận",
    statVerifiedReviews: "đánh giá đã xác minh",
    statEvents: "sự kiện đã theo dõi",

    onTheRecord: "Có bằng chứng",
    featuredProblemsLabel: "Đề bài",
    featuredProblemsSub: "mỗi đề bài là một vấn đề thực tế từ nhà tài trợ",
    featuredAdvertisedLabel: "Cam kết",
    featuredAdvertisedValue: "Ưu đãi $1M+",
    featuredAdvertisedSub: "chủ yếu từ chương trình bên thứ ba & gói miễn phí",
    featuredReportedLabel: "Báo cáo",
    featuredReportedValue: "Không nhận được credit",
    featuredReportedSub: "đã đăng ký qua cổng, nhận về $0",
    seeFullRecord: "Xem toàn bộ hồ sơ",
    communityRecord: "Hồ sơ cộng đồng",

    howItWorksTitle: "Cách thức hoạt động",
    step1Title: "Tìm đơn vị tổ chức",
    step1Body:
      "Uy tín đi theo đơn vị tổ chức qua nhiều sự kiện, chứ không chỉ gói gọn trong một cuối tuần.",
    step2Title: "Xem hồ sơ",
    step2Body:
      "Xem tổng hợp khách quan từ những người tham dự đã được xác minh.",
    step3Title: "Đóng góp của bạn",
    step3Body: "Đã tham gia? Hãy để lại đánh giá đã xác minh — bạn vẫn ẩn danh.",
    howItWorksLink: "Cách thức hoạt động",

    organizersOnRecord: "Đơn vị tổ chức có hồ sơ",
    howWeKeepItHonest: "Chúng tôi đảm bảo tính minh bạch thế nào",
  },

  howItWorks: {
    metaTitle: "Cách thức hoạt động",
    metaDescription:
      "Kiểm tra đơn vị tổ chức trước khi dành cả cuối tuần, và chia sẻ đánh giá đã xác minh của bạn.",
    eyebrow: "Cách thức hoạt động",
    title: "Biết rõ bạn đang xây dựng cho ai",
    intro: (brandName: string) =>
      `Một cuối tuần cặm cụi là lao động thực sự. ${brandName} là hồ sơ bền vững do cộng đồng xây dựng, ghi nhận những đơn vị tổ chức hackathon giữ đúng lời hứa — để tiếng nói không tan biến trong Discord ngay hôm thứ Ba.`,
    steps: [
      {
        title: "Tìm đơn vị tổ chức",
        body: "Tra cứu công ty, đơn vị tổ chức hoặc nhà tài trợ đứng sau sự kiện. Uy tín đi theo con người qua nhiều sự kiện, vì cùng một nhóm người thường tổ chức hackathon dưới những cái tên mới.",
      },
      {
        title: "Xem hồ sơ",
        body: "Xem bản tổng hợp khách quan từ những người tham dự đã được xác minh: giải thưởng có được trao không, credit quảng cáo có thật không, ban giám khảo có công bằng không, và thực tế có đúng như lời quảng bá không?",
      },
      {
        title: "Thêm đánh giá của bạn",
        body: "Bạn đã tham dự? Hãy viết một đánh giá đã xác minh, từ chính trải nghiệm của bạn. Nêu rõ sự việc, đính kèm bằng chứng cho bất kỳ khẳng định nào có tính chất nghiêm trọng. Bạn sẽ ẩn danh — thông tin xác thực danh tính được lưu riêng biệt và không bao giờ hiển thị công khai.",
      },
      {
        title: "Đơn vị tổ chức phản hồi",
        body: "Đơn vị tổ chức có thể nhận quyền quản lý trang của họ và phản hồi công khai. Những bên làm tốt sẽ có cơ hội chứng minh họ đã sửa sai; toàn bộ lịch sử vẫn được giữ nguyên cho mọi người xem.",
      },
    ],
    ctaDirectory: "Duyệt danh sách",
    ctaReview: "Viết đánh giá",
  },

  trust: {
    metaTitle: "Niềm tin & An toàn",
    metaDescription:
      "Cách HackHonest đảm bảo tính xác thực, ẩn danh, kiểm duyệt và quyền phản hồi.",
    eyebrow: "Niềm tin & An toàn",
    title: "Làm sao để giữ được sự trung thực",
    sections: {
      host: {
        title: "Chúng tôi lưu trữ, không phán xét",
        body: (brandName: string) =>
          `${brandName} là nền tảng trung lập lưu lại những gì người tham dự đã xác minh báo cáo. Chúng tôi không bao giờ tự viết đánh giá, cũng không tự đánh giá hay buộc tội bất kỳ ai. Mọi con số bạn thấy đều là tổng hợp thuần túy từ phản hồi thực tế của người tham dự, ví dụ như “3 trên 4 người đánh giá đã xác minh cho biết giải thưởng không được trao như cam kết.” Kết luận là do bạn tự rút ra.`,
      },
      verified: {
        title: "Chỉ chấp nhận đánh giá đã xác minh, từ người trong cuộc",
        body: "Đánh giá chỉ đến từ những người thực sự tham gia. Chúng tôi xác minh việc tham dự trước khi đăng, thông qua các tín hiệu mà người đánh giá có thể chứng minh quyền sở hữu — chẳng hạn như tài khoản GitHub liên kết với repo dự án của sự kiện, email xác nhận từ tên miền chính thức của ban tổ chức, hoặc bằng chứng như email trúng tuyển hay ảnh chụp màn hình dashboard. Chúng tôi không chấp nhận đánh giá gián tiếp hoặc giả định.",
      },
      anonymous: {
        title: "Đã xác minh, nhưng ẩn danh",
        body: "Người đánh giá đăng bài dưới tên ảo. Thông tin dùng để xác minh danh tính của bạn được lưu trữ tách biệt khỏi nội dung đánh giá và không bao giờ được công khai, giúp đơn vị tổ chức không thể trả đũa bạn vì chia sẻ trung thực. Chúng tôi chỉ lưu giữ mức tối thiểu cần thiết.",
      },
      facts: {
        title: "Sự thật thay vì lăng mạ",
        body: "Mẫu đánh giá được thiết kế để ghi lại những gì đã xảy ra, không phải để chửi bới. Hãy nêu rõ sự việc, sau đó mới đưa ra quan điểm cá nhân. Đính kèm bằng chứng cho bất kỳ tuyên bố cứng nào (như giải thưởng đã hứa, tín dụng chưa giao). Một bài đánh giá có tài liệu, từ người trong cuộc, vừa hữu ích hơn cho người tham gia sau, vừa vững chắc hơn nhiều so với một bài than vãn.",
      },
      reply: {
        title: "Quyền phản hồi dành cho đơn vị tổ chức",
        body: "Bất kỳ đơn vị tổ chức nào cũng có thể nhận quyền quản lý trang của mình và đăng phản hồi công khai với bất kỳ đánh giá nào. Họ được nói lời cuối, nhưng không thể xóa đánh giá chỉ vì không đồng ý. Chúng tôi chỉ gỡ nội dung khi vi phạm rõ ràng chính sách (tiết lộ thông tin cá nhân, lạc đề, nội dung bất hợp pháp, hoặc đánh giá từ người chưa từng tham dự) — không bao giờ vì một doanh nghiệp yêu cầu gỡ phản hồi trung thực.",
      },
      report: {
        title: "Báo cáo sự cố",
        body: "Phát hiện đánh giá giả, đánh giá từ người chưa tham dự, hoặc nội dung cần gỡ bỏ? Hãy báo cáo — chúng tôi sẽ xem xét. Lạm dụng công cụ báo cáo cũng là một hành vi vi phạm.",
      },
    },
    footnote: (region: string) =>
      `Đây là một dự án cộng đồng tại ${region}. Nội dung không phải là tư vấn pháp lý, và trang này không phải trang chính thức của đơn vị tổ chức.`,
  },

  about: {
    metaTitle: "Giới thiệu",
    metaDescription:
      "Lý do tồn tại của kho lưu trữ cộng đồng về các đơn vị tổ chức hackathon, và đối tượng mà nó phục vụ.",
    eyebrow: "Giới thiệu",
    title: "Tại sao nền tảng này ra đời",
    p1: 'AI khiến ai cũng có thể xây dựng sản phẩm thật nhanh, nên hackathon bùng nổ. Kèm theo đó là một làn sóng lạm dụng: các công ty tổ chức "hackathon" mà đề bài chính là những bài toán kinh doanh thật, đã được đặc tả sẵn của họ, rồi đem giải pháp thắng cuộc đi triển khai thay vì trả tiền cho một đội ngũ phát triển. Đơn vị tổ chức hứa hẹn quá đà về credit, giải thưởng và ưu đãi rồi chẳng bao giờ giao. Những lập trình viên trẻ, đầy nhiệt huyết đem cho không cả một cuối tuần lao động thật chỉ để đổi lấy một lời hứa.',
    p2: (brandName: string) =>
      `Hiện nay, tất cả những điều đó đều không để lại dấu vết tìm kiếm được. Một trải nghiệm tồi thường chết lịm trong một dòng tweet bực tức, một kênh Discord sự kiện, hay nhóm chat — và lứa người tham dự tiếp theo lại bước vào hoàn toàn mù mờ. ${brandName} chính là giải pháp: một hồ sơ công khai, bền vững về những đơn vị tổ chức, công ty và nhà tài trợ nào giữ lời hứa — được xây dựng từ lời kể trực tiếp của những người thực sự có mặt.`,
    p3: "Nền tảng được thiết kế cân bằng: khen ngợi sự kiện tốt để ngày càng nhiều người tham gia; ghi lại sự kiện xấu để ít người bị lừa hơn. Nền tảng không bao giờ buộc tội ai — nó chỉ hiển thị những gì người tham dự đã xác minh báo cáo, và để bạn tự đưa ra quyết định.",
    p4: (region: string) =>
      `Đây là một dự án cộng đồng, khởi đầu tại ${region} — nơi nhu cầu cấp thiết nhất hiện nay. Nền tảng chỉ là công cụ. Hồ sơ này thuộc về chính cộng đồng xây dựng nên nó.`,
  },

  tos: {
    metaTitle: "Điều khoản & chính sách nội dung",
    metaDescription: "Các quy tắc đăng bài và cách nội dung được xử lý.",
    eyebrow: "Điều khoản & Chính sách nội dung",
    title: "Quy tắc, bằng ngôn ngữ rõ ràng",
    intro: (brandName: string) =>
      `${brandName} là nền tảng trung lập đăng tải đánh giá từ người dùng. Dưới đây là những nguyên tắc cơ bản — phiên bản pháp lý đầy đủ sẽ được công bố khi ra mắt chính thức.`,
    rules: [
      {
        h: "Bạn là tác giả",
        p: "Bạn — người viết đánh giá — là tác giả và chủ sở hữu duy nhất của bài đánh giá đó. Nền tảng chỉ lưu trữ nội dung; chúng tôi không đứng ra viết thay hay chịu trách nhiệm về nội dung đó.",
      },
      {
        h: "Trực tiếp và trung thực",
        p: "Chỉ đăng đánh giá về những sự kiện bạn từng tham dự trực tiếp. Bạn cam kết rằng nội dung bạn viết phản ánh đúng trải nghiệm cá nhân, và bạn có đầy đủ quyền cũng như sự đồng ý cần thiết cho bất kỳ bằng chứng nào bạn tải lên.",
      },
      {
        h: "Quan điểm và sự thật được nêu rõ",
        p: "Hãy nêu rõ sự thật làm cơ sở, rồi mới đưa ra quan điểm. Kết luận rút ra từ những sự thật bạn đã nêu là ý kiến được bảo vệ của bạn. Đừng trình bày như một sự thật những điều bạn không thể chứng minh.",
      },
      {
        h: "Không bịa đặt",
        p: "Tuyệt đối không đăng đánh giá giả — dù theo hướng tích cực hay tiêu cực. Không tự đánh giá sự kiện của chính bạn, và không được trả tiền hay ép buộc người khác viết đánh giá. Đây là quy tắc bắt buộc.",
      },
      {
        h: "Bảo vệ người khác",
        p: "Che khuất tên, khuôn mặt, email và số điện thoại của bên thứ ba trong mọi bằng chứng bạn đăng. Không tiết lộ thông tin cá nhân của người khác.",
      },
      {
        h: "Quyền phản hồi, không phải quyền xóa",
        p: "Đơn vị tổ chức được đánh giá có thể nhận diện trang của họ và phản hồi công khai, nhưng không được xóa những phản biện trung thực. Nội dung chỉ bị gỡ khi vi phạm rõ ràng các quy định.",
      },
      {
        h: "Báo cáo và gỡ bỏ",
        p: "Hãy báo cáo nếu phát hiện đánh giá giả, đánh giá từ người chưa từng tham dự, tiết lộ thông tin cá nhân (doxxing) hoặc nội dung vi phạm pháp luật — chúng tôi sẽ xem xét. Chúng tôi tuân thủ các yêu cầu pháp lý hợp lệ và thông báo cho người viết đánh giá khi có thể.",
      },
    ],
    footnote: (region: string) =>
      `Đây là một dự án cộng đồng tại ${region} và không phải là tư vấn pháp lý. Trang trên nền tảng này không phải là trang chính thức của đơn vị tổ chức.`,
  },

  directory: {
    metaTitle: "Danh bạ",
    metaDescription:
      "Duyệt và tìm kiếm các đơn vị tổ chức, công ty và nhà tài trợ hackathon, cùng những gì người tham dự đã xác minh và chia sẻ.",
    title: "Danh bạ",
    subtitle:
      "Tìm kiếm các công ty, đơn vị tổ chức và nhà tài trợ đứng sau các sự kiện hackathon.",
    searchAria: "Tìm kiếm đơn vị tổ chức, nhà tài trợ, công ty và sự kiện",
    searchPlaceholder: "Tìm đơn vị tổ chức, nhà tài trợ, sự kiện…",
    clearSearch: "Xóa tìm kiếm",
    filterGroupAria: "Lọc danh bạ theo danh mục",
    tabAll: "Tất cả",
    tabOrganizers: "Đơn vị tổ chức",
    tabEvents: "Sự kiện",
    tabCompanies: "Công ty",
    tabSponsors: "Nhà tài trợ",
    noMatches: (q: string) => `Không có kết quả cho "${q}".`,
    addFirstReviewArrow: "Viết đánh giá đầu tiên →",
    addToDirectoryArrow: "Thêm vào danh bạ →",
    nothingHereYet: "Chưa có gì ở đây cả.",
    addFirstReview: "Viết đánh giá đầu tiên",
    alsoKnownAs: (list: string) => `Còn được biết đến với tên ${list}`,
    claimed: "Đã được nhận diện",
  },

  reviewNew: {
    metaTitle: "Viết đánh giá",
    metaDescription:
      "Đăng đánh giá đã xác minh, từ trải nghiệm thực tế của bạn về đơn vị tổ chức hoặc sự kiện hackathon.",
    eyebrow: "Viết đánh giá",
    title: "Hãy kể đúng những gì đã xảy ra",
    intro: (posture: string) =>
      `Chỉ đánh giá những sự kiện bạn từng tham dự. Bạn sẽ ẩn danh, và chúng tôi xác minh bạn thực sự có mặt trước khi xuất bản bất kỳ nội dung nào. ${posture}`,
  },

  reviewForm: {
    errChooseTarget: "Vui lòng chọn bạn đang đánh giá cái gì.",
    errOverall: "Vui lòng chọn mức đánh giá tổng thể.",
    errHeadline: "Vui lòng viết một dòng tiêu đề ngắn (ít nhất 6 ký tự).",
    errBody: "Vui lòng mô tả những gì đã xảy ra (ít nhất 40 ký tự).",
    errGeneric: "Có lỗi xảy ra. Vui lòng thử lại.",
    errNetwork: "Lỗi kết nối mạng. Vui lòng thử lại.",
    successBody: "Đánh giá của bạn đã được gửi và đang chờ xác minh.",
    successHeading: "Cảm ơn bạn",
    successNote:
      "Chúng tôi xác minh rằng người viết đánh giá thực sự đã tham dự trước khi xuất bản bất kỳ nội dung nào. Danh tính của bạn được lưu riêng biệt và sẽ không bao giờ được tiết lộ.",

    targetLabel: "Bạn đang đánh giá gì?",
    targetPlaceholder: "Chọn một đơn vị tổ chức hoặc sự kiện…",
    optgroupEvents: "Sự kiện",
    optgroupOrganizers: "Đơn vị tổ chức",

    overallLabel: "Đánh giá tổng thể",

    dimensionsLabel: "Chấm điểm theo thực tế",
    dimensionsHelp: "Bỏ qua mục nào không áp dụng.",

    headlineLabel: "Tiêu đề",
    headlinePlaceholder: "Một dòng: điều gì người tham dự tiếp theo cần biết?",

    bodyLabel: "Đã xảy ra chuyện gì?",
    bodyHelp:
      "Trình bày sự việc trước, sau đó mới nêu quan điểm. Đính kèm bằng chứng cho bất kỳ tuyên bố nào có tính chất nghiêm túc (giải thưởng đã hứa, tín dụng không được giao, v.v.).",
    bodyPlaceholder:
      "Mình đã tham dự [event]. Họ hứa hẹn… nhưng mình nhận được… Dưới đây là những gì mình có thể chứng minh…",

    proofLabel: "Chứng minh bạn đã tham dự thế nào?",
    proofHelp:
      "Chỉ dùng để xác minh — không bao giờ công khai. Ví dụ: link dự án trên Devpost, email xác nhận, tên Discord, hoặc ảnh chụp.",
    proofPlaceholder: "Link hoặc mô tả bằng chứng tham dự của bạn",

    authorLabel: "Tên hiển thị (không bắt buộc)",
    authorHelp:
      "Một biệt danh hiển thị cùng đánh giá của bạn. Để trống nếu muốn ẩn danh.",
    authorPlaceholder: "ví dụ: Người tham dự đã xác minh",

    contactLabel: "Liên hệ riêng (không bắt buộc)",
    contactHelp: "Chỉ dùng để xác minh. Không bao giờ hiển thị hay chia sẻ.",
    contactPlaceholder: "email hoặc tên handle",

    submit: "Gửi để xác minh",
    submitting: "Đang gửi…",
    submitNote: "Đánh giá được kiểm duyệt trước khi xuất bản.",
  },

  suggest: {
    metaTitle: "Đề xuất một mục mới",
    metaDescription:
      "Dán link sự kiện hoặc đơn vị tổ chức, AI sẽ hỗ trợ bạn thêm vào thư mục. Bạn xem lại và xác nhận mọi thông tin trước khi gửi.",
    navLink: "Thêm sự kiện hoặc đơn vị tổ chức",
    eyebrow: "Đề xuất một mục mới",
    title: "Thêm sự kiện hoặc đơn vị tổ chức",
    intro:
      "Dán link của một hackathon, đơn vị tổ chức, hoặc nhà tài trợ. AI sẽ đọc trang đó, điền sẵn thông tin, và kiểm tra xem đã có trong thư mục chưa. Bạn xem lại, chỉnh sửa nếu cần, rồi gửi — không có gì được đăng tự động.",
    urlLabel: "Link sự kiện hoặc đơn vị tổ chức",
    urlPlaceholder: "https://…",
    urlHelp: "Link đến trang sự kiện, website đơn vị tổ chức, hoặc trang nhà tài trợ.",
    analyze: "Phân tích bằng AI",
    analyzing: "Đang phân tích…",
    fillManually: "Hoặc điền thủ công",
    errUrlRequired: "Vui lòng dán link trước.",
    errUrlInvalid: "Vui lòng nhập link http(s) hợp lệ.",
    aiDisabledNote:
      "Tính năng phân tích AI chưa được bật — vui lòng điền thủ công bên dưới. Mục bạn gửi vẫn sẽ vào hàng đợi kiểm duyệt.",
    analysisFailedNote:
      "Chúng tôi không thể phân tích link này tự động. Vui lòng điền thủ công bên dưới.",
    prefilledNote:
      "AI đã điền sẵn thông tin từ link. Hãy kiểm tra từng trường và sửa nếu có gì chưa chính xác trước khi gửi.",
  },

  suggestForm: {
    duplicatesTitle: "Có thể mục này đã có trong thư mục",
    duplicatePrefix: "Có vẻ giống",
    duplicateSuffix: "— có thể đã tồn tại.",
    duplicatesHelp:
      "Nếu mục bạn định thêm đã có trong danh sách này, hãy gửi đánh giá của bạn vào đó thay vì tạo bản sao.",
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
    locationPlaceholder: "Ví dụ: TP. Hồ Chí Minh, Việt Nam",
    datesLabel: "Thời gian",
    datesHelp: "Chỉ áp dụng cho sự kiện.",
    datesPlaceholder: "Ví dụ: 20–24 Thg 8, 2026",
    blurbLabel: "Mô tả",
    blurbHelp: "Một hoặc hai câu khách quan, nêu rõ sự thật — không buộc tội, chỉ mô tả đúng bản chất.",
    blurbPlaceholder: "Đây là sự kiện hay đơn vị tổ chức nào? Hãy giữ nguyên tính khách quan.",
    sponsorsLabel: "Nhà tài trợ phát hiện",
    sponsorsHelp: "Liệt kê cách nhau bằng dấu phẩy. Sửa hoặc xóa nếu cần.",
    sponsorsPlaceholder: "Ví dụ: Ngân hàng Crestline, SwiftCart",
    submittedByLabel: "Tên hoặc nickname của bạn (không bắt buộc)",
    submittedByHelp: "Để chúng tôi ghi nhận hoặc liên hệ nếu cần. Thông tin này sẽ không hiển thị công khai.",
    submittedByPlaceholder: "Ví dụ: tên trên Devpost hoặc email",
    errName: "Vui lòng nhập tên (ít nhất 2 ký tự).",
    errType: "Vui lòng chọn loại mục.",
    errWebsite: "Website phải là đường dẫn http(s) hợp lệ.",
    errGeneric: "Đã xảy ra sự cố. Vui lòng thử lại.",
    errNetwork: "Lỗi mạng. Vui lòng thử lại.",
    submit: "Gửi để kiểm duyệt",
    submitting: "Đang gửi…",
    submitNote: "Gửi đề xuất",
    successHeading: "Cảm ơn bạn!",
    successBody: "Đề xuất của bạn đã được nhận và đang chờ kiểm duyệt.",
    successNote:
      "Chúng tôi xem xét từng đề xuất trước khi đưa vào danh bạ. Không có gì được đăng tự động.",
    startOver: "Đề xuất khác",
  },

  ratingBand: {
    good: "Được đánh giá tốt",
    mixed: "Đánh giá trái chiều",
    poor: "Bị đánh giá kém",
  },

  verified: {
    attendee: "Người tham dự đã xác minh",
    methods: {
      "founder-attested": {
        label: "Xác nhận bởi founder",
        detail: "Một founder có tên đã xác nhận người viết đánh giá này từng tham dự sự kiện.",
      },
      github: {
        label: "Xác minh qua GitHub",
        detail: "Liên kết với tài khoản GitHub có bài nộp phù hợp.",
      },
      evidence: {
        label: "Có bằng chứng",
        detail: "Người viết đánh giá đã cung cấp ảnh chụp màn hình hoặc tài liệu hỗ trợ.",
      },
      "email-dkim": {
        label: "Xác minh qua email",
        detail: "Đã xác nhận qua email có chữ ký DKIM từ ban tổ chức sự kiện.",
      },
    },
  },

  aggregate: {
    defaultTitle: "Hồ sơ cộng đồng",
    ariaRecord: (title: string) => `${title}: hồ sơ cộng đồng`,
    basedOnPrefix: "Dựa trên",
    verifiedSuffix: "đã xác minh",
    noReviewsCta:
      "Chưa có đánh giá nào. Hãy là người tham dự đã xác minh đầu tiên chia sẻ trải nghiệm của bạn.",
    noRatingsYet: "Chưa có xếp hạng",
    dimAriaNone: (label: string) => `${label}: chưa có xếp hạng`,
    dimAriaValue: (label: string, avg: string, count: number) =>
      `${label}: ${avg} trên 5 từ ${count} người đánh giá`,
    whatReported: "Những gì người tham dự đã xác minh báo cáo",
    reviewersReported: "người tham dự đã xác minh báo cáo",
    ratedLow: (dimLabel: string) => `cho điểm "${dimLabel}" ở mức 2 sao trở xuống`,
    postureNote: (brandName: string) =>
      `Đây là số liệu tổng hợp từ báo cáo của người tham dự đã xác minh — không phải đánh giá do ${brandName} đưa ra.`,
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
    organizerReply: "Phản hồi từ đơn vị tổ chức",
  },

  organizerPage: {
    metaTitleFallback: "Đơn vị tổ chức",
    metaTitle: (name: string) => `${name} — đánh giá & hồ sơ sự kiện hackathon`,
    metaDescription: (name: string, blurb: string) =>
      `${name} có phải đơn vị tổ chức/tài trợ hackathon đáng tin cậy? Dưới đây là những gì người tham dự đã xác minh chia sẻ: ${blurb}`,
    crumbOrganizer: "Đơn vị tổ chức",
    crumbSponsor: "Nhà tài trợ",
    alsoSeenAs: (list: string) => `Còn được biết đến với tên: ${list}`,
    writeReview: "Viết đánh giá",
    claimPage: "Xác nhận quyền sở hữu trang",
    claimTooltip: "Quyền phản hồi — sẽ khả dụng khi ra mắt công khai",
    aggregateTitle: "Người tham dự đã xác minh nói gì",
    eventsHeading: "Sự kiện",
    roleOrganized: "Tổ chức",
    roleSponsored: "Tài trợ",
    noReviews: "Chưa có đánh giá nào.",
    beFirst: "Là người đầu tiên đánh giá",
  },

  eventPage: {
    metaTitleFallback: "Sự kiện",
    metaTitle: (name: string) => `${name} — đánh giá & hồ sơ`,
    metaDescription: (name: string, dates: string, location: string) =>
      `Dưới đây là chia sẻ từ những người tham dự đã xác minh về ${name} (${dates}, ${location}): giải thưởng, quyền lợi, tiêu chí chấm điểm và cấu trúc hỗ trợ từ nhà tài trợ.`,
    crumbEvent: "Sự kiện",
    organizedBy: "tổ chức bởi",
    howItWorked: "Cách thức tổ chức:",
    writeReview: "Viết đánh giá",
    aggregateTitle: "Người tham dự đã xác minh nói gì",
    advertisedHeading: "Được quảng cáo",
    perksHeading:
      "Đặc quyền & tín dụng được quảng cáo so với thực tế",
    perksColProvider: "Nhà cung cấp",
    perksColAdvertised: "Được quảng cáo",
    perksColReported: "Thực tế ghi nhận",
    tracksHeading: "Các chủ đề & bài toán",
    tracksSubtitle: (problems: number, tracks: number) =>
      `${problems} bài toán từ ${tracks} chủ đề, mỗi bài do một doanh nghiệp cụ thể đưa ra. Mọi bài dự thi đều phải giải quyết một trong số này.`,
    problemsBadge: (n: number) => `${n} bài toán`,
    sponsoredBy: "Tài trợ bởi",
    winnersHeading: "Đội lọt vào vòng trong & đội thắng giải",
    winnersSubtitleMapped: (count: number) =>
      `Theo thông tin do đơn vị tổ chức đăng tải. Cả ${count} dự án có trong hồ sơ đều được xây dựng để giải quyết bài toán thực tế của nhà tài trợ cụ thể.`,
    winnersSubtitlePlain: "Theo thông tin do đơn vị tổ chức đăng tải.",
    forSponsor: (name: string) => `cho ${name}`,
    factsHeading: "Thông tin chính thức",
    factsSubtitle:
      "Sự thật có nguồn về sự kiện này. Chúng tôi nêu rõ — không suy diễn.",
    source: (src: string) => `Nguồn: ${src}`,
    problemsHeading: (n: number) => `${n} bài toán được đưa ra`,
    problemsSubtitle:
      "Mỗi bài là một vấn đề thực tế từ doanh nghiệp cụ thể.",
    noReviews: "Chưa có đánh giá nào. Bạn có tham dự không?",
    beFirst: "Đăng đánh giá đầu tiên",
    sponsorsOnRecord: (list: string) => `Các nhà tài trợ ghi nhận: ${list}.`,
  },

  perkStatus: {
    not_received: "Không nhận được",
    third_party_program: "Chương trình bên thứ ba",
    out_of_stock: "Hết hàng",
    delivered: "Đã nhận",
    unknown: "Chưa xác minh",
  },

  placement: {
    Winner: "Giải nhất",
    "Runner-up": "Á quân",
    Shortlist: "Vào vòng trong",
  },

  reviewDimensions: {
    prizes: {
      label: "Giải thưởng đúng cam kết",
      help: "Giải thưởng được quảng cáo có được trao đầy đủ và đúng hạn không?",
    },
    perks: {
      label: "Đặc quyền & tín dụng là thật",
      help: "Những quyền lợi/ưu đãi được liệt kê có thực sự do đơn vị tổ chức cung cấp, hay chỉ là chương trình của bên thứ ba được \"đóng gói\" lại?",
    },
    judging: {
      label: "Ban giám khảo công bằng & minh bạch",
      help: "Tiêu chí rõ ràng, không xung đột lợi ích, và kết quả được giải thích?",
    },
    organization: {
      label: "Tổ chức tốt",
      help: "Địa điểm, lịch trình, thông tin liên lạc và hỗ trợ như thế nào?",
    },
    honesty: {
      label: "Truyền thông trung thực",
      help: "Thực tế có khớp với những gì được quảng cáo không?",
    },
    respect: {
      label: "Tôn trọng sản phẩm của người tham dự",
      help: "Có đối xử công bằng với thời gian, quyền sở hữu trí tuệ và công sức của bạn không?",
    },
  },

  starRating: {
    ratingWithMax: (max: number) => `Đánh giá, tối đa ${max} sao`,
    starOfMax: (i: number, max: number) => `${i} trên ${max} sao`,
    valueOutOfMax: (value: string, max: number) => `${value} trên ${max} sao`,
  },

  footer: {
    explore: "Khám phá",
    trust: "Uy tín",
    community: "Cộng đồng",
    disclaimer: (brandName: string) =>
      `Đây không phải trang chính thức của đơn vị tổ chức. ${brandName} lưu trữ các đánh giá độc lập, trực tiếp từ người tham dự đã được xác minh. Mọi con số trên trang này đều là tổng hợp từ phản hồi thực tế của người tham dự.`,
    copyright: (year: number, brandName: string) => `© ${year} ${brandName}`,
  },

  // ── Diễn đàn cộng đồng ──────────────────────────────────────────────────────
  forum: {
    navLink: "Cộng đồng",
    metaTitle: "Cộng đồng",
    metaDescription:
      "Trao đổi với những người xây dựng khác về đơn vị tổ chức, nhà tài trợ, giải thưởng và các sự kiện hackathon.",
    title: "Cộng đồng",
    subtitle:
      "Trao đổi với nhau. Cảnh báo về những đơn vị thiếu uy tín, chia sẻ trải nghiệm thực tế và hỏi ý kiến trước khi dành cả cuối tuần cho một sự kiện.",
    startThread: "Tạo chủ đề mới",
    loginToPost: "Đăng nhập để đăng bài",
    signedInAs: (handle: string) => `Đăng với tư cách ${handle}`,
    categoriesHeading: "Danh mục",
    recentHeading: "Chủ đề gần đây",
    threadsIn: (name: string) => `Chủ đề trong ${name}`,
    replyCount: (n: number) => `${n} trả lời`,
    postCount: (n: number) => `${n} bài`,
    noThreadsYet: "Chưa có chủ đề nào ở đây.",
    beFirst: "Tạo chủ đề đầu tiên",
    startedBy: (handle: string) => `bởi ${handle}`,
    by: "bởi",
    lastActivity: "Hoạt động gần nhất",
    aboutActor: (name: string) => `Về ${name} →`,

    backToForum: "← Cộng đồng",
    backToCategory: (name: string) => `← ${name}`,
    repliesHeading: "Phản hồi",
    noRepliesYet: "Chưa có phản hồi nào. Hãy là người đầu tiên chia sẻ ý kiến.",
    replyHeading: "Gửi phản hồi",
    replyLabel: "Phản hồi của bạn",
    replyPlaceholder: "Chia sẻ điều bạn biết. Hãy trình bày trực tiếp và đúng sự thật.",
    replySubmit: "Đăng phản hồi",
    replySubmitting: "Đang đăng…",
    loginToReply: "Đăng nhập để phản hồi",
    loginToReplyNote: "Bạn cần một tài khoản miễn phí để tham gia thảo luận.",
    locked: "Đã khóa",
    lockedNote: "Chủ đề này đã khóa. Bạn vẫn có thể đọc, nhưng không thể gửi phản hồi mới.",

    newMetaTitle: "Mở chủ đề thảo luận",
    newTitle: "Mở chủ đề thảo luận",
    newSubtitle:
      "Hãy trình bày trực tiếp và đúng sự thật. Đây là hồ sơ công khai và tồn tại lâu dài — hãy đối xử với đơn vị tổ chức như cách bạn muốn được đối xử, và đưa ra bằng chứng rõ ràng cho những cáo buộc nghiêm trọng.",
    categoryLabel: "Danh mục",
    categoryPlaceholder: "Chọn danh mục…",
    titleLabel: "Tiêu đề",
    titlePlaceholder: "Một dòng: chủ đề này nói về điều gì?",
    bodyLabel: "Bài viết của bạn",
    bodyPlaceholder:
      "Điều đã xảy ra, câu hỏi của bạn, hoặc thông tin người khác nên biết. Trình bày sự thật trước, sau đó mới nêu quan điểm.",
    bodyHelp: "Tối thiểu 20 ký tự. Hiện tại chưa hỗ trợ định dạng Markdown — bạn cứ viết bằng văn bản thuần.",
    actorLabel: "Liên kết với đơn vị tổ chức hoặc sự kiện (không bắt buộc)",
    actorHelp: "Gắn chủ đề này với một mục trong danh bạ để người khác dễ tìm thấy.",
    actorNone: "Không liên kết với mục cụ thể nào",
    createSubmit: "Đăng chủ đề",
    creating: "Đang đăng…",

    errTitle: "Gửi bài đánh giá",
    errBody: "Hãy chia sẻ trải nghiệm của bạn — chi tiết, trung thực, và dựa trên thực tế.",
    errCategory: "Vui lòng chọn một danh mục.",
    errAuth: "Vui lòng đăng nhập để gửi bài.",
    errGeneric: "Đã xảy ra sự cố. Vui lòng thử lại.",
    errNetwork: "Lỗi mạng. Vui lòng thử lại.",

    justNow: "vừa xong",
  },

  // ── Tài khoản / đăng nhập ───────────────────────────────────────────────────
  auth: {
    emailLabel: "Email",
    emailPlaceholder: "ban@vidu.com",
    emailHelp: "Riêng tư. Chỉ dùng để đăng nhập và xác minh — không bao giờ hiển thị hay chia sẻ.",
    passwordLabel: "Mật khẩu",
    passwordPlaceholder: "Ít nhất 8 ký tự",
    handleLabel: "Tên người dùng",
    handleHelp:
      "Tên hiển thị công khai của bạn trong cộng đồng. Chỉ dùng chữ thường, số và dấu gạch dưới; độ dài 3–24 ký tự. Đây là thứ duy nhất người khác thấy — email của bạn luôn được giữ kín.",
    handlePlaceholder: "ví dụ: weekend_builder",

    loginMetaTitle: "Đăng nhập",
    loginTitle: "Đăng nhập",
    loginSubtitle: "Chào mừng trở lại. Đăng nhập để gửi bài trong cộng đồng.",
    loginSubmit: "Đăng nhập",
    loginSubmitting: "Đang đăng nhập…",
    noAccountPrompt: "Mới dùng lần đầu?",
    signUpLink: "Tạo tài khoản",

    signupMetaTitle: "Tạo tài khoản",
    signupTitle: "Tạo tài khoản",
    signupSubtitle:
      "Chọn tên người dùng và bạn đã sẵn sàng. Bạn có thể ẩn danh — email không bao giờ được hiển thị, nên bạn thoải mái nói thật mà không lo đơn vị tổ chức trả đũa.",
    signupSubmit: "Tạo tài khoản",
    signupSubmitting: "Đang tạo…",
    haveAccountPrompt: "Đã có tài khoản rồi?",
    loginLink: "Đăng nhập",

    confirmEmailHeading: "Kiểm tra email của bạn",
    confirmEmailBody:
      "Chúng tôi đã gửi bạn một liên kết để xác nhận tài khoản. Nhấn vào liên kết đó, rồi quay lại và đăng nhập.",
    privacyNote:
      "Email của bạn luôn riêng tư và không bao giờ hiển thị. Tên người dùng là danh tính công khai duy nhất của bạn.",

    errEmail: "Vui lòng nhập địa chỉ email hợp lệ.",
    errPassword: "Mật khẩu phải có ít nhất 8 ký tự.",
    errHandle:
      "Tên người dùng phải từ 3–24 ký tự: chỉ dùng chữ thường, số và dấu gạch dưới.",
    errHandleTaken: "Tên người dùng này đã được sử dụng. Hãy thử tên khác.",
    errInvalidCredentials: "Sai email hoặc mật khẩu.",
    errEmailInUse: "Email này đã có tài khoản. Hãy thử đăng nhập.",
    errGeneric: "Đã xảy ra sự cố. Vui lòng thử lại.",
    errNetwork: "Lỗi mạng. Vui lòng thử lại.",
  },

  // ── Trang tài khoản ─────────────────────────────────────────────────────────
  account: {
    navLink: "Tài khoản",
    metaTitle: "Tài khoản của bạn",
    title: "Tài khoản của bạn",
    signedInAs: "Đã đăng nhập với",
    publicHandle: "Tên người dùng",
    privateEmail: "Email riêng tư (không bao giờ hiển thị)",
    memberSince: (date: string) => `Tham gia từ ${date}`,
    signOut: "Đăng xuất",
    myThreads: "Bài thảo luận của bạn",
    noThreads: "Bạn chưa bắt đầu bất kỳ thảo luận nào.",
    startOne: "Tạo mới",
    reputation: "Uy tín",
    viewProfile: "Xem hồ sơ công khai",
    moderation: "Hàng chờ kiểm duyệt",
  },

  // ── Trang công khai / uy tín ────────────────────────────────────────────────
  profile: {
    metaTitle: (handle: string) => `${handle}`,
    metaDescription: (handle: string) =>
      `Hoạt động của ${handle} trên cộng đồng HackHonest.`,
    notFound: "Thành viên này không tồn tại.",
    reputation: "Uy tín",
    memberSince: (date: string) => `Tham gia từ ${date}`,
    discussionsStarted: (n: number) => `Đã tạo ${n} thảo luận`,
    repliesPosted: (n: number) => `Đã đăng ${n} trả lời`,
    threadsHeading: "Thảo luận",
    noThreads: "Chưa có thảo luận nào.",
  },

  // ── Đơn vị tổ chức nhận trang + quyền phản hồi ──────────────────────────────
  claim: {
    metaTitle: (name: string) => `Xác nhận quyền sở hữu ${name}`,
    title: (name: string) => `Xác nhận quyền sở hữu ${name}`,
    intro:
      "Nếu bạn đại diện cho đơn vị tổ chức này, hãy nhận quyền sở hữu trang để phản hồi các đánh giá. Bạn có thể trả lời công khai, nhưng không bao giờ được xóa đánh giá.",
    loginToClaim: "Đăng nhập để nhận trang này",
    emailNote: (email: string) =>
      `Chúng tôi sẽ ghi lại email tài khoản của bạn (${email}) để một người thật xác minh rằng bạn đại diện cho đơn vị tổ chức này.`,
    domainMatch: (domain: string) =>
      `Email của bạn có cùng tên miền với ${domain}, nên yêu cầu nhận trang của bạn sẽ được duyệt nhanh chóng.`,
    domainNoMatch:
      "Email tài khoản của bạn không khớp với tên miền website, nên yêu cầu nhận trang sẽ được xem xét thủ công.",
    submit: "Gửi yêu cầu",
    submitting: "Đang gửi…",
    successHeading: "Đã gửi yêu cầu",
    successBody:
      "Chúng tôi sẽ xác minh bạn có đại diện cho đơn vị tổ chức này hay không. Sau đó, bạn có thể phản hồi các đánh giá tại đây.",
    pending: "Yêu cầu nhận trang này của bạn đang chờ duyệt.",
    claimedByYou: "Bạn đang quản lý trang này — có thể phản hồi các đánh giá bên dưới.",
    claimedBadge: "Đã nhận",
    claimedByName: (handle: string) => `Đã nhận bởi ${handle}`,
    replyCta: "Phản hồi với tư cách đơn vị tổ chức",
    replyHeading: "Phản hồi của bạn",
    replyPlaceholder:
      "Phản hồi đánh giá này. Hãy nêu rõ sự thật. Bạn không thể xóa đánh giá, chỉ có thể bổ sung góc nhìn của mình.",
    replySubmit: "Đăng phản hồi",
    replySubmitting: "Đang đăng…",
    errAuth: "Vui lòng đăng nhập trước.",
    errActor: "Không tìm thấy đơn vị tổ chức.",
    errAlready: "Bạn đã gửi yêu cầu nhận trang này rồi.",
    errReplyBody: "Vui lòng viết phản hồi (từ 2 đến 5000 ký tự).",
    errReplyDenied: "Chỉ chủ sở hữu trang đã được xác minh mới có thể phản hồi.",
    errGeneric: "Đã xảy ra sự cố. Vui lòng thử lại.",
  },

  // ── Hàng chờ kiểm duyệt (quản trị) ──────────────────────────────────────────
  moderate: {
    metaTitle: "Kiểm duyệt",
    title: "Hàng chờ kiểm duyệt",
    subtitle:
      "Duyệt hoặc từ chối những nội dung cộng đồng gửi lên — đánh giá, mục danh bạ và yêu cầu nhận trang.",
    allClear: "Không còn gì đang chờ — bạn đã xử lý hết.",
    reviewsHeading: (n: number) => `Đánh giá đang chờ (${n})`,
    suggestionsHeading: (n: number) => `Mục danh bạ đang chờ (${n})`,
    claimsHeading: (n: number) => `Yêu cầu nhận trang đang chờ (${n})`,
    approve: "Duyệt",
    reject: "Từ chối",
    reviewFor: (name: string) => `Đánh giá về ${name}`,
    reviewForUnknown: "Đánh giá (chưa gắn mục nào)",
    byAuthor: (author: string) => `bởi ${author}`,
    anon: "ẩn danh",
    proofLabel: "Bằng chứng tham dự",
    contactLabel: "Liên hệ riêng tư",
    claimHeadline: (handle: string, name: string) => `${handle} muốn nhận ${name}`,
    domainMatches: "email khớp với tên miền của website",
    domainNoMatch: "tên miền email không khớp với website",
    sourceLabel: "Liên kết nguồn",
    submittedByLabel: "Người gửi",
  },
};
