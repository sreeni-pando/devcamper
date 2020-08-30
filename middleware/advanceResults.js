
const advancedResults = (model, populate) => async (req, res, next) =>{
    let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery)

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1)*limit;
  const endIndex = page*limit;
  const totalDocuments = await model.count();
  query = query.skip(startIndex).limit(limit);
  if(populate){
      query = query.populate(populate);
  }
  const result = await (query);
  let pagination = {};
  if(startIndex>0){
      pagination.prev ={
          limit,
          page: page-1,
      }
  }
  if(endIndex< totalDocuments){
      pagination.next = {
          limit,
          page: page+1,
      }
  }
  console.log('result', result);
  res.advancedResults = {
      success: true,
      count: result.length,
      pagination,
      data: result
  }
  next();
}

module.exports = advancedResults;